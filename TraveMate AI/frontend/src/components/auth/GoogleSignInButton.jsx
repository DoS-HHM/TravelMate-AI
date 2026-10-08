import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GOOGLE_SCRIPT_ID = 'google-identity-services';

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();

    const existing = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Unable to load Google Sign-In'));
    document.head.appendChild(script);
  });
}

export default function GoogleSignInButton() {
  const containerRef = useRef(null);
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    let cancelled = false;

    if (!clientId) {
      setAvailable(false);
      return undefined;
    }

    loadGoogleScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            if (!credential) return;
            try {
              await googleLogin(credential);
              navigate('/dashboard', { replace: true });
            } catch (err) {
              toast.error(err.response?.data?.message || 'Google sign-in failed');
            }
          },
        });

        containerRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(containerRef.current, {
          theme: 'outline',
          size: 'large',
          width: 400,
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        });
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => { cancelled = true; };
  }, [clientId, googleLogin]);

  if (!available) return null;

  return (
    <>
      <div ref={containerRef} className="flex justify-center min-h-10" aria-label="Continue with Google" />
      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
    </>
  );
}

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const email = process.argv[2] || process.env.ADMIN_EMAIL;

if (!email) {
  console.error('Usage: node scripts/promote-admin.js your@email.com');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { role: 'admin' } },
      { new: true }
    ).select('name email role');

    if (!user) {
      console.error(`No user found for ${email}`);
      process.exitCode = 1;
      return;
    }

    console.log(`Admin access granted: ${user.name} <${user.email}> (${user.role})`);
  } catch (error) {
    console.error('Could not promote user:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();

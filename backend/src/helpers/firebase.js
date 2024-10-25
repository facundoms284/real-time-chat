const admin = require('firebase-admin');
const serviceAccount = require('../real-time-chat-bios-firebase-adminsdk-bebxw-5f1121cf16.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = admin;

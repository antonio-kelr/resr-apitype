import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../../config/animated-cinema-392321-firebase-adminsdk-p2awy-259ada752f.json') as ServiceAccount;
const BUCKET = 'animated-cinema-392321.appspot.com';

if (!admin.apps.length) { 
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: BUCKET
    });
}

const bucketInstance = admin.storage().bucket();

export { bucketInstance, BUCKET }; 
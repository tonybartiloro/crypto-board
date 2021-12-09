import fbAdmin from "firebase-admin";
import { initializeApp, getApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldPath, Timestamp } from "firebase-admin/firestore";

const firebaseConfig = {
	credential: fbAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
	databaseURL: process.env.FIREBASE_URL,
};

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export const app = firebaseApp;
export const firestoreDb = db;
export const firestoreFieldPath = FieldPath;
export const firestoreTimestamp = Timestamp;

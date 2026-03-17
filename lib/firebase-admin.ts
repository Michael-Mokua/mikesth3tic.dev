import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

let adminApp: App | null = null;

function getAdminApp(): App | null {
    if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
        return null;
    }

    if (getApps().length > 0) {
        return getApps()[0];
    }

    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
    );

    adminApp = initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

    return adminApp;
}

export function getAdminDb() {
    const app = getAdminApp();
    if (!app) return null;
    return getFirestore(app);
}

export function getAdminAuth() {
    const app = getAdminApp();
    if (!app) return null;
    return getAuth(app);
}

export function getAdminStorage() {
    const app = getAdminApp();
    if (!app) return null;
    return getStorage(app);
}

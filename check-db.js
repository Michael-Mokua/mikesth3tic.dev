const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp, cert } = require("firebase-admin/app");
require("dotenv").config({ path: ".env.local" });

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

const app = initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
    }),
});

const db = getFirestore(app);

async function run() {
    const snap = await db.collection("contact_submissions").orderBy("createdAt", "desc").limit(1).get();
    if (snap.empty) {
        console.log("LOG: No submissions found.");
    } else {
        const data = snap.docs[0].data();
        console.log("LOG: Latest submission date:", data.createdAt.toDate().toISOString());
        console.log("LOG: Latest submission name:", data.name);
    }
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});

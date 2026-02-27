import { getAdminDb } from "./lib/firebase-admin";

async function checkSubmissions() {
    const db = getAdminDb();
    const snap = await db.collection("contact_submissions").orderBy("createdAt", "desc").limit(1).get();
    if (snap.empty) {
        console.log("No submissions found.");
    } else {
        console.log("Latest submission:", JSON.stringify(snap.docs[0].data(), null, 2));
    }
}

checkSubmissions().catch(console.error);

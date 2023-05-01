import { db } from "../initiate-firebase.ts";

import { doc, setDoc } from "firebase/firestore"; 

export async function post(docs: string, id: string, data) {
    const docRef = doc(db, docs, id);
    await setDoc(docRef, data, { merge: true }).catch(console.error)
    return docRef.id
}


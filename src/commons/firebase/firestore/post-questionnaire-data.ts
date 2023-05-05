import { db } from "../initiate-firebase.ts";

import { doc, setDoc } from "firebase/firestore"; 

export async function post(docs: string, id: string, data) {
    const docRef = doc(db, docs, id);
    return await setDoc(docRef, data, { merge: false })
}


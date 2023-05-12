import { db } from "../initiate-firebase.ts";

import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore"; 

export async function post(docs: string, id: string, data) {
    const docRef = doc(db, docs, id);
    return await setDoc(docRef, data, { merge: false })
}

export async function getAll(docs: string) {
    const querySnapshot = await getDocs(collection(db, docs))
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
    })
}

export async function doesBrokerExist(email: string) {
    const docRef = doc(db, "brokers", email)
    const document = await getDoc(docRef).catch(console.error)
    return document?.exists()? true: false
}

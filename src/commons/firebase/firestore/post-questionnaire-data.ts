import { db } from "../initiate-firebase.ts";

//import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore"; 

// try {
//   const docRef = await addDoc(collection(db, "questionnaire-1"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


export async function post(docs: string, id: string, data) {
    // const docRef = await addDoc(collection(db, docs), data)
    // .catch(console.error)
    const docRef = doc(db, docs, id);
    await setDoc(docRef, data, { merge: true }).catch(console.error)
    return docRef.id
}


import { getStorage, ref, uploadString } from "firebase/storage";

const storage = getStorage();

export async function upload(file: string, path: string) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadString(storageRef, file).catch(console.error)
    if (!snapshot) {
        console.error("you don't have access to create")
    } else {
        console.log('Uploaded a raw string!');
    }
}


import { firebaseApp } from "./initiate-firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { currentUser, User } from '/commons/pubsub/store'

const signInProviders = {
    'google': signInGoogle
}

export async function signInPopup (provider: string) {
	const newUser = await signInProviders[provider]()
	if (!newUser) {
		return
	}
	currentUser.pub(newUser)
}

// access firebase auth
export const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

async function signInGoogle () {
    const result = await signInWithPopup(auth, googleProvider)
	.catch(error => {
		console.log("error in sign in to google", error)
	})

	if (!result) {
		return
	}

	// This gives you a Google Access Token. You can use it to access the Google API.
	const credential = GoogleAuthProvider.credentialFromResult(result);
	const token = credential?.accessToken;
	// IdP data available using getAdditionalUserInfo(result)
	const {displayName, accessToken, email, photoURL, phoneNumber, uid} = result.user

	const newUser: User = {isSignedIn: true, displayName, accessToken, email, photoURL, phoneNumber, uid}
	return newUser
}


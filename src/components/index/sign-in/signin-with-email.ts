import { LitElement, html } from "lit";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "/commons/firebase/authentication/signin-providers"

class SigninWithEmail extends LitElement {

    email = ""

    password = ""

    render() {
        return html`
        <form @submit=${this.checkSignIn}>
            <input @input=${e => this.email = e.target.value} type="email" placeholder="Enter your email">
            <input @input=${e => this.password = e.target.value} type="password" placeholder="Enter your password">
            <button type="submit">submit</button>
    </form> 
    `}

    // Handle the submit event of the sign in form.
    checkSignIn(e) {
        console.log('here', this.email, this.password)
        e.preventDefault();
        // Sign in the user with the email and password.
        signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredintial) => {
            // The user is signed in successfully.
            console.log("User signed in successfully.");
        })
        .catch((error) => {
            // An error occurred signing in the user.
            console.log("Error signing in user:", error);
        });
    }
}
customElements.define('signin-with-email', SigninWithEmail)

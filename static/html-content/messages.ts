
import { html } from "lit"

export const successfulSubmission = html`
<h1>Successful Submission</h1>
<p>
Thank you for giving our product a chance and completing our insurance questionnaire. Your feedback is valuable to us. 
</p>
<p>Within <b>72 hours</b>, we'll provide personalized quotes, along with our recommendations and next
steps. Please login back to your MIA accounts or check your email (inbox and/or spam) to see our offered quotes. 
</p>
<p>
Rest assured, we're committed to assisting you every step of
the way. We look forward to helping you find the best insurance
options for your needs. Thank you for considering our product.
</p>
`

export const feedbackForm = html`
<div>
    <p>
        Thank you for providing feedback. We will review your feedback and get back to you as soon as possible.
    </p>

    <input required name="email" type="email" placeholder="Enter Your Email">
    <input name="phone" type="tel" pattern="[0-9]{10}" placeholder="Phone number no space" title="Phone number 10 digits no space" >
</div>

<div>
    <textarea required name="feedback-text" placeholder="write your feedback here">
    </textarea>
</div>

<div>
    How satisfied are you with the overall quality of our products/services?
    <ul>
    <label>
        <input required name="satisfaction" type="radio" value="satisfied">
        Satisfied
    </label>
    <label>
        <input name="satisfaction" type="radio" value="neutral">
        Neutral
    </label>
    <label>
        <input name="satisfaction" type="radio" value="dissatisfied">
        Dissatisfied
    </label>
    </ul>
</div>

<div>
    Did you encounter any issues or problems while using our products/services?
    <ul>
    <label>
        <input required name="any-problem" type="radio" value="yes">
        Yes
    </label>
    <label>
        <input name="any-problem" type="radio" value="no">
        No
    </label>
    <ul>
</div>
`

export const feedbackThankyou = html`
<h1>
    Feedback submitted
</h1>
<p>
    Thank you for providing feedback. We will review your feedback and get back to you (if you have provided phone number or email address) as soon as possible.
</p>

`

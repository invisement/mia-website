
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

export const aboutUs = html`
<p>
Welcome to <a href="https://mia.invisement.com">MIA</a>, your one-stop insurance solution!
</p> 
<ul>
    <li>📞 Tel: <a href="tel:201-916-5068">201-916-5068</a></li>
    <li>📧 Email: <a href="mailto: Mia.InfoAndHelp@gmail.com">Mia.InfoAndHelp@gmail.com</a></li>
    <li>📝 Message: <a href="/feedback-form">Leave us a message</a> </li>
</ul>
<p>
We understand that navigating the world of insurance can be overwhelming, especially if you're not an expert. That's why we've created a simple and user-friendly platform that connects you to a wide range of insurance companies. With just one questionnaire, we gather the information we need to provide you with personalized quotes tailored to your needs.
</p>
<p>
But our service doesn't stop there. We go the extra mile to make your insurance journey hassle-free. As your dedicated digital insurance broker, we're here to support you every step of the way. Whether you have questions about your policy or need assistance with a claim, we're just a click or a call away.
</p>
<p>
At <a href="https://mia.invisement.com">MIA</a>, we believe that insurance should be accessible and easy to understand for everyone. Say goodbye to the confusion and let us simplify the process for you. Experience the convenience of connecting to multiple insurance providers effortlessly, receiving quotes that fit your requirements, and enjoying peace of mind knowing that we've got your back. Join MIA.com today and discover a whole new way to secure the insurance coverage you deserve.
</p>
`

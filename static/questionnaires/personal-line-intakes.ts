import { html } from "lit"
//import "/components/elements/add-more.ts"


export const personalLoan = html`

<div>
<h2>Household Information</h2>
    <label>
        Current Address:
        <input required name="street-address" placeholder="street address">
        <input required name="city" placeholder="city" size=10>
        <input required name="state" placeholder="state" size=2 pattern="[a-zA-Z]{2}">
        <input required name="zip-code" placeholder="zip code" size=5 pattern="[0-9]{5}">
    </label>

        Mailing Address (if different from above):
        <label>
            <input required type="radio" value="yes"  name="different-mailing-address">
            The same as current address
        </label>
        <label>
            <input required type="radio" value="no"  name="different-mailing-address">
            Different address: 
            <input required name="street-address" placeholder="street address">
            <input required name="city" placeholder="city" size=10>
            <input required name="state" placeholder="state" size=2 pattern="[a-zA-Z]{2}">
            <input required name="zip-code" placeholder="zip code" size=5 pattern="[0-9]{5}">
        </label>
</div>

<div>
<h2> Insured Individuals </h2>

    <p>
        For each insured individual, provide the following information. Add as many individuals as required.
    </p> 

<clone-me>
    <label>
        Full Legal Name:
        <input required name="first-name" placeholder="First Name" size=5>
        <input name="middle-name" placeholder="Middle Name" size=2>
        <input required name="last-name" placeholder="Last Name">
    </label>

    
    <label>
        Contact Telephone(s):
        <input required type="tel" name="telephone" placeholder="tel: 10 digits no space" pattern="[0-9]{10}">
    </label>

    <label>
        Contact Email:
        <input required type="email" name="email">
    </label>

    <label>
        Dates of Birth:
        <input required type="date" name="dob">
    </label>

    <label>
        *SS#'s (Named Insureds Only):
        <input required name="ssn" type="password" pattern="[0-9]{9}" placeholder="SSN: 9 digits no space">
    </label>

    <label>
        Occupations (Named Insured Only):
        <input name="occupation" placeholder="occupation">
    </label>

    <label>Driver's License #:
        <input required name="driver-license" placeholder="driver license">
    </label>


    <p>Any accidents in the past 5 years?
    <label>
        <input type="radio" name="accident-history" value="no" required>
        No Accident
    </label>
    <label>
        <input type="radio" name="accident-history" value="yes" required>
        Yes. List any known accidents or violations in the past 5 years:
        <clone-me class="row">
            <input name="accident-driver-name" placeholder="driver name" size=5>
            <input name="accident-month" type="date">
            <input name="accident-description" placeholder="Describe your accident">
        </clone-me>
    </label>
    </p>
</clone-me>
</div>

<div>
    <h2>
        Especial discounts
    </h2>
        Select as many applies to you. We might need you provide additional documents later.
    <ul>
        <label>
            <input type="checkbox" name="good-student">
            A/B Student driver 
        </label>
        <label>
            <input type="checkbox" name="safe-drive">
            Willing to participate in safe drive (app monitors your test driving) 
        </label>
        <label>
            <input type="checkbox">
            Auto-payment Discount
        </label>
    </ul>
</div>
    `
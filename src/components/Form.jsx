import React, { useState } from "react";

function Form() {


    // state to storage the values given by the user when filling the input fields
    const [userValues, setUserValues] = useState({
        amount: "",
        years: "1"
    });

    // state to storage the results of the calculation
    const [results, setResults] = useState({
        monthlyPayment: "₦",
        totalInterest: "₦",
        totalPayment: "₦",
        isResult: false
    });

    // state to storage error message
    const [error, setError] = useState("");


    // event handler to update state when the user enters values
    function handleAmountInputChange(event) {

        setUserValues({ ...userValues, amount: event.target.value });

    }

    function handleYearsInputChange(event) {


        setUserValues({ ...userValues, years: event.target.value });

    }

    // Manage validations and error messages

    function isValid() {
        const { amount, years } = userValues;
        let actualError = "";

        // show error if amount is greater than N10,000,000
        if (amount > 10000000) {
            actualError = "₦10,000,000 is the maximum we can loan";
        }

        // show error if amount is less than N20,000
        if (amount < 20000) {
            actualError = "₦20,000 is the minimum we can loan";
        }

        if (actualError) {
            setError(actualError);
            return false;
        }
        return true;
    }

    // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
    function handleSubmitValues(e) {
        e.preventDefault();
        if (isValid()) {
            setError("");
            calculateResults(userValues);
        }
    };


    function calculateResults({ amount, interest, years }) {

        // currency formatter
        const formatter = new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN"

        })

        // Calculate

        const principal = parseFloat(Number(amount));
        const CalculateInterest = parseFloat(Number(2)) / 100 / 12;
        const calculatedPayments = parseFloat(Number(years)) * 12;

        //Compute monthly Payment

        const x = Math.pow(1 + CalculateInterest, calculatedPayments);
        const monthly = (principal * x * CalculateInterest) / (x - 1);

        // if (isFinite(monthly)) {

        const monthlyPayments = monthly.toFixed(2);

        //Compute Interest

        const totalInterests = (monthly * calculatedPayments - principal).toFixed(2);

        //Compute Total Payment

        const totalPayments = (monthly * calculatedPayments).toFixed(2);

        //Show results(Set up results to the state to be displayed to the user)

        setResults({
            monthlyPayment: formatter.format(monthlyPayments),
            totalInterest: formatter.format(totalInterests),
            totalPayment: formatter.format(totalPayments),
            isResult: true
        });

        // }
        // return;
    };


    return (

        <div>

            <form onSubmit={handleSubmitValues}>

                <div class="form-group">

                    <label>LOAN AMOUNT ( How much will you like to borrow ? )</label>
                    <input value={userValues.amount} type="number" className="form-control" onChange={handleAmountInputChange} placeholder="₦" required></input>

                </div>

                <div class="form-group">
                    <label>NUMBER OF YEARS ( For how long ? )</label>

                    <select className="form-control" type="number" value={userValues.years} onChange={handleYearsInputChange} required>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block mb-3">
                    Calculate
                </button>

            </form>

            <p style={{ color: "red" }}>{error}</p>


            <table>

                <tr>
                    <td>Monthly Payments</td>

                    <td>{results.monthlyPayment}</td>

                </tr>
                <tr>
                    <td>Interest to pay</td>

                    <td>{results.totalInterest}</td>

                </tr>
                <tr>
                    <td>Total Amount to pay</td>

                    <td>{results.totalPayment}</td>

                </tr>

            </table>


        </div>);
}


export default Form;
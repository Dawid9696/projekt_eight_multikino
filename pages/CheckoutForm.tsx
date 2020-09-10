/** @format */

import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [email, setEmail] = useState("");
	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		const res = axios.post("http://localhost:3000/pay", { email });
		const clientSecret = res.data["client_secret"];
		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					email: email,
				},
			},
		});

		if (result.error) {
			// Show error to your customer (e.g., insufficient funds)
			console.log(result.error.message);
		} else {
			// The payment has been processed!
			if (result.paymentIntent.status === "succeeded") {
				console.log("Money is in the bank");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardSection />
			<button disabled={!stripe}>Confirm order</button>
		</form>
	);
}

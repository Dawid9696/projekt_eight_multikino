/** @format */

import type { AppProps /*, AppContext */ } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../lib/redux";
import { ThemeProvider } from "styled-components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const theme = {
	colors: {
		primary: "red",
	},
};

const stripePromise = loadStripe("pk_test_51HPWeZHl6hRsIXPjdjRAcRCE6FQVS1tPstTloMcjnwh5tFpV6wx0B3e4BAdxkPujsqFNgbCxNEhMsZAxGqxDYMun0028jlZOU9");

export default function App({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Elements stripe={stripePromise}>
					<Component {...pageProps} />
				</Elements>
			</ThemeProvider>
		</Provider>
	);
}

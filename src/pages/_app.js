import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import theme from "../theme";
import Layout from "../components/layout/";
import createEmotionCache from "../createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { SWRConfig as SWRConfigProvider } from "swr";
import { CurrencyContext, UserContext } from "../contexts/";
import { useState } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

/* export function reportWebVitals(metric) {
	console.log(metric);
}
 */
const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
	const [currency, setCurrency] = useState("USD");

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Crypto Board</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SWRConfigProvider
					value={{
						errorRetryCount: 0,
						revalidateIfStale: false,
						revalidateOnFocus: false,
						revalidateOnReconnect: false,
					}}
				>
					<UserContext.Provider value={{ userId: "0KxUgaok5LltvsatEPCG", username: "tony.bartiloro" }}>
						<CurrencyContext.Provider value={{ currency, setCurrency }}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</CurrencyContext.Provider>
					</UserContext.Provider>
				</SWRConfigProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;

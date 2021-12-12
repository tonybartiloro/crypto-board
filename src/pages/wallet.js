import Grid from "@mui/material/Grid";
import RequireAuth from "../components/hocs/requireAuth";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import WalletForm from "../components/user/walletForm";

const Wallet = () => {
	return (
		<>
			<Head>
				<title>Crypto Board - Wallet</title>
			</Head>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography component="h1" variant="h2">
						Wallet
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<RequireAuth>
						<WalletForm />
					</RequireAuth>
				</Grid>
			</Grid>
		</>
	);
};

export default Wallet;

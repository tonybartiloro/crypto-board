import Grid from "@mui/material/Grid";
import RequireAuthAdmin from "../components/hocs/requireAuthAdmin";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import AssetsForm from "../components/assets/assetsForm";

const Assets = () => {
	return (
		<>
			<Head>
				<title>Crypto Board - Assets</title>
			</Head>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography component="h1" variant="h2">
						Assets
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<RequireAuthAdmin>
						<AssetsForm />
					</RequireAuthAdmin>
				</Grid>
			</Grid>
		</>
	);
};

export default Assets;

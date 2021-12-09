import Grid from "@mui/material/Grid";
import AssetPriceList from "../components/tickers/assetPriceList";
import Balance from "../components/tickers/balance";
import Allocations from "../components/tickers/allocations";
import RequireAuth from "../components/hocs/requireAuth";

const Index = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<RequireAuth>
							<Balance />
						</RequireAuth>
					</Grid>
					<Grid item xs={12}>
						<RequireAuth>
							<Allocations />
						</RequireAuth>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<RequireAuth>
					<AssetPriceList />
				</RequireAuth>
			</Grid>
		</Grid>
	);
};

export default Index;

import Grid from "@mui/material/Grid";
import AssetPriceList from "../components/tickers/assetPriceList";
import Balance from "../components/tickers/balance";
import Allocations from "../components/tickers/allocations";

const Index = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Balance />
					</Grid>
					<Grid item xs={12}>
						<Allocations />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<AssetPriceList />
			</Grid>
		</Grid>
	);
};

export default Index;

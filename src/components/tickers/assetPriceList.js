import Grid from "@mui/material/Grid";
import { useUserAssets } from "../../hooks/";
import { useCurrencyContext } from "../../contexts/";
import AssetPrice from "./assetPrice";
import Skeleton from "../misc/skeleton";

const AssetPriceList = () => {
	const { currency } = useCurrencyContext();
	const { assets, loading } = useUserAssets();

	return (
		<>
			<Grid container spacing={3}>
				{assets.map(({ symbol, name, logo, prices, amount }) => (
					<Grid key={symbol} item xs={12}>
						<AssetPrice
							symbol={symbol}
							name={name}
							currency={currency}
							amount={amount}
							price={prices.find((conversion) => conversion.currency === currency)?.price}
							logo={logo}
							lastUpdated={prices.find((conversion) => conversion.currency === currency)?.lastUpdated}
						/>
					</Grid>
				))}
				{loading && (
					<Grid item xs={12}>
						<Skeleton />
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default AssetPriceList;

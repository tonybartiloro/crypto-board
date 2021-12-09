import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { formatPrice, formatAssetAmount } from "../../utils";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const AssetPrice = ({ symbol, logo, price, currency, amount, lastUpdated }) => {
	return (
		<Paper
			elevation={4}
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
				//height: 240,
			}}
		>
			<Stack direction="row" spacing={2}>
				<Avatar alt={symbol} src={logo} />
				<Stack direction="column" spacing={0.5}>
					<Typography component="p" variant="h5">
						{formatAssetAmount(amount)} {symbol}
					</Typography>
					<Typography component="p" variant="body2">
						{formatPrice(price * amount)} {currency}
					</Typography>
					<Typography component="p" variant="body2">
						{`1 ${symbol} = ${formatPrice(price)} ${currency}`}
					</Typography>
					<Typography component="p" variant="body1">
						{`${new Date(lastUpdated).toLocaleString()}`}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default AssetPrice;

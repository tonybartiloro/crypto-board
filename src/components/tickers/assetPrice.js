import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { formatPrice, formatAssetAmount } from "../../utils";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const AssetPrice = ({ symbol, logo, price, currency, amount, lastUpdated }) => {
	return (
		<Paper
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
				//height: 240,
			}}
		>
			<Stack direction="row" spacing={2}>
				<Avatar alt={symbol} src={logo} />
				<Stack direction="column" spacing={1}>
					<Typography component="p" variant="h4">
						{formatAssetAmount(amount)} {symbol}
					</Typography>
					<Typography component="p" variant="body1">
						{formatPrice(price * amount)} {currency}
					</Typography>
					<Typography component="p" variant="body1">
						{`1 ${symbol} = ${formatPrice(price)} ${currency} [ ${lastUpdated} ]`}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default AssetPrice;

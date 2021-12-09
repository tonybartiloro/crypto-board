import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { formatPrice } from "../../utils";
import Stack from "@mui/material/Stack";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useCurrencyContext } from "../../contexts/";
import { useUserAssets } from "../../hooks/";
import Skeleton from "../misc/skeleton";

const Balance = () => {
	const { currency } = useCurrencyContext();
	const { assets, loading } = useUserAssets();

	const amount = assets
		.map(({ prices, amount }) => prices.find((conversion) => conversion.currency === currency)?.price * amount)
		.reduce((a, b) => a + b, 0);

	return (
		<Paper
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
				//height: 240,
			}}
		>
			{
				<Stack direction="row" spacing={2}>
					<AccountBalanceIcon />
					<Stack direction="column" spacing={1} style={{ width: "100%" }}>
						<Typography component="p" variant="h4">
							{"Balance"}
						</Typography>
						{loading ? (
							<Skeleton />
						) : (
							<Typography component="p" variant="body1">
								{formatPrice(amount)} {currency}
							</Typography>
						)}
					</Stack>
				</Stack>
			}
		</Paper>
	);
};

export default Balance;

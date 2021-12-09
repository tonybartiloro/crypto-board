import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { formatPrice, formatAssetAmount } from "../../utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import { useUserAssets } from "../../hooks/";
import { useCurrencyContext } from "../../contexts/";
import Skeleton from "../misc/skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

const Allocations = () => {
	const { currency } = useCurrencyContext();

	const { assets, loading } = useUserAssets();

	const totalAmount = assets
		.map(({ prices, amount }) => prices.find((conversion) => conversion.currency === currency)?.price * amount)
		.reduce((a, b) => a + b, 0);

	const data = {
		labels: assets.map(({ symbol }) => symbol),
		datasets: [
			{
				data: assets.map(
					({ prices, amount }) => (prices.find((conversion) => conversion.currency === currency)?.price * amount * 100) / totalAmount
				),
				backgroundColor: assets.map(({ hex }) => hex),
				borderColor: assets.map(({ hex }) => hex),
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (data) {
						return `${data.label}: ${data.formattedValue} %`;
					},
				},
			},
		},
	};

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
			<Stack direction="column" spacing={2}>
				<Typography component="p" variant="h5">
					{"Allocations"}
				</Typography>
				{loading ? <Skeleton /> : <Pie data={data} options={options} />}
			</Stack>
		</Paper>
	);
};

export default Allocations;

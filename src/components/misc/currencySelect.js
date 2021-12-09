import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCurrencyContext } from "../../contexts";

const CurrencySelect = () => {
	const { currency, setCurrency } = useCurrencyContext();

	return (
		<Select value={currency} onChange={(e) => setCurrency(e.target.value)} color="secondary">
			<MenuItem value={"EUR"}>EUR</MenuItem>
			<MenuItem value={"USD"}>USD</MenuItem>
		</Select>
	);
};

export default CurrencySelect;

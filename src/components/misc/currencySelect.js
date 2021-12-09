import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCurrencyContext } from "../../contexts";
import { useCurrencies } from "../../hooks/";

const CurrencySelect = () => {
	const { currencies } = useCurrencies();
	const { currency, setCurrency } = useCurrencyContext();

	return (
		currencies.length > 0 && (
			<Select value={currency} onChange={(e) => setCurrency(e.target.value)} color="secondary">
				{currencies.map(({ code }) => (
					<MenuItem key={code} value={code}>
						{code}
					</MenuItem>
				))}
			</Select>
		)
	);
};

export default CurrencySelect;

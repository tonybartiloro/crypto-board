import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { useSyncData, useUserAssets, useCurrencies, useAssets } from "../../hooks/";
import { useCallback } from "react";

const SyncData = () => {
	const { currencies } = useCurrencies();
	const { assets, mutate: updateAssets } = useAssets();
	const { action, loading } = useSyncData();
	const { mutate: updateUserAssets } = useUserAssets();

	const onSyncData = useCallback(async () => {
		await action({
			assets: assets
				//.filter(({ symbol }) => symbol === "ANKR")
				.map(({ symbol, coinmarketcapId }) => ({
					symbol,
					coinmarketcapId,
				})),
			symbolsTo: currencies.map(({ code }) => code),
		});
		await updateAssets();
		await updateUserAssets();
	}, [action, updateAssets, updateUserAssets, currencies, assets]);

	return (
		<IconButton disabled={loading || assets.length == 0} color="inherit" onClick={onSyncData}>
			<RefreshIcon />
		</IconButton>
	);
};

export default SyncData;

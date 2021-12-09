import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { useSyncData, useUserAssets, useCurrencies, useAssets } from "../../hooks/";
import { useCallback } from "react";

const SyncData = () => {
	const { currencies } = useCurrencies();
	const { assets } = useAssets();
	const { action, loading } = useSyncData();
	const { mutate: updateAssets } = useUserAssets();

	const onSyncData = useCallback(async () => {
		await action({
			assets: assets.map(({ symbol, coinmarketcapId }) => ({
				symbol,
				coinmarketcapId,
			})),
			symbolsTo: currencies.map(({ code }) => code),
		});
		updateAssets();
	}, [action, updateAssets, currencies, assets]);

	return (
		<IconButton disabled={loading || assets.length == 0} color="inherit" onClick={onSyncData}>
			<RefreshIcon />
		</IconButton>
	);
};

export default SyncData;

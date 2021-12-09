import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { useSyncData, useUserAssets } from "../../hooks/";
import { useCallback } from "react";

const SyncData = () => {
	const { action, loading } = useSyncData();
	const { mutate: updateAssets } = useUserAssets();

	const onSyncData = useCallback(async () => {
		await action({
			symbols: ["BTC", "ETH", "BNB", "ADA", "LUNA", "MATIC", "EOS", "TIME", "AVAX", "EGLD", "BUSD", "UST"],
			symbolsTo: ["USD", "EUR"],
		});
		updateAssets();
	}, [action, updateAssets]);

	return (
		<IconButton disabled={loading} color="inherit" onClick={onSyncData}>
			<RefreshIcon />
		</IconButton>
	);
};

export default SyncData;

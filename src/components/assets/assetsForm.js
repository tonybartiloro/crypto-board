import { useState, useCallback } from "react";
import { useAssets, useAssetsAdd, useAssetsDelete, useSyncData, useUserAssets, useCurrencies } from "../../hooks/";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Skeleton from "../misc/skeleton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { default as MuiDialog } from "@mui/material/Dialog";
import { default as MuiDialogTitle } from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import { formatAssetAmount } from "../../utils";
import { useCurrencyContext } from "../../contexts/";
import RefreshIcon from "@mui/icons-material/Refresh";

const schemaAdd = yup
	.object({
		symbol: yup.string().required(),
		type: yup.string().required(),
	})
	.required();

const ActionButton = styled(Fab)(({ theme }) => ({
	marginLeft: 5,
}));

const FloatingBar = styled(Box)(({ theme }) => ({
	position: "fixed",
	bottom: 50,
	right: 20,
}));

const AssetList = styled(Box)(({ theme }) => ({
	paddingBottom: 40,
}));

const Dialog = styled(MuiDialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const DialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
};

const AssetsForm = ({}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const { action: syncData, loading: loadingSyncData } = useSyncData();

	const { assets, loading: loadingAssets, mutate: updateAssets } = useAssets();

	const { mutate: updateUserAssets } = useUserAssets();

	const { action: addAsset, loading: addLoading } = useAssetsAdd();

	const { action: deleteAsset, loading: deleteLoading } = useAssetsDelete();

	const { currency } = useCurrencyContext();

	const { currencies } = useCurrencies();

	const {
		control: controlAdd,
		handleSubmit: handleSubmitAdd,
		formState: { errors: errorsAdd },
		register: registerAdd,
		reset: resetAdd,
	} = useForm({
		resolver: yupResolver(schemaAdd),
		defaultValues: {
			type: "crypto",
			symbol: "",
		},
	});

	const onSubmitAdd = async ({ symbol, type }) => {
		handleClose();
		await addAsset({
			symbol,
			type,
		});
		updateAssets();
		resetAdd();
	};

	const onAssetDelete = async ({ symbol }) => {
		await deleteAsset({
			symbol,
		});

		await updateAssets();
	};

	const onSyncData = useCallback(
		async (assetSymbol) => {
			await syncData({
				assets: assets
					.filter(({ symbol }) => symbol === assetSymbol)
					.map(({ symbol, coinmarketcapId }) => ({
						symbol,
						coinmarketcapId,
					})),
				symbolsTo: currencies.map(({ code }) => code),
			});
			await updateAssets();
			await updateUserAssets();
		},
		[syncData, updateAssets, updateUserAssets, currencies, assets]
	);

	return (
		<AssetList>
			{assets.map(({ symbol, logo, prices }) => (
				<Paper
					key={symbol}
					elevation={4}
					sx={{
						p: 2,
						mt: 2,
						display: "flex",
						flexDirection: "column",
						//height: 240,
					}}
				>
					<Stack direction="column" spacing={1} alignItems="left">
						<Stack direction="row" spacing={2} alignItems="center">
							<IconButton disabled={deleteLoading} color="inherit" onClick={() => onAssetDelete({ symbol })}>
								<DeleteIcon />
							</IconButton>
							<Avatar alt={symbol} src={logo} />
							<Typography component="p" variant="h5">
								{symbol}
							</Typography>
						</Stack>
						<Typography component="p" variant="body2">
							{formatAssetAmount(prices.find((conversion) => conversion.currency === currency)?.price)} {currency}
						</Typography>
						<Typography component="p" variant="body1">
							{`${new Date(prices.find((conversion) => conversion.currency === currency)?.lastUpdated).toLocaleString()}`}
						</Typography>
						<div>
							<IconButton disabled={loadingSyncData} color="inherit" onClick={() => onSyncData(symbol)}>
								<RefreshIcon />
							</IconButton>
						</div>
					</Stack>
				</Paper>
			))}
			{loadingAssets && !assets.length && <Skeleton />}
			<Dialog onClose={handleClose} open={open} fullWidth>
				<DialogTitle onClose={handleClose}>Add new asset</DialogTitle>
				<DialogContent dividers>
					<form>
						<Stack direction="column" spacing={4}>
							<TextField
								label="Type"
								name="type"
								required
								select
								defaultValue="crypto"
								{...registerAdd("type")}
								error={errorsAdd.type?.type === "required"}
								helperText={errorsAdd.type?.message || " "}
							>
								<MenuItem key={"crypto"} value={"crypto"}>
									<Typography component="p" variant="p">
										{"crypto"}
									</Typography>
								</MenuItem>
							</TextField>

							<TextField
								name="symbol"
								required
								error={errorsAdd.symbol?.type === "required"}
								helperText={errorsAdd.symbol?.message || " "}
								label="Symbol"
								{...registerAdd("symbol")}
							/>
						</Stack>
					</form>
				</DialogContent>
				<DialogActions>
					<Button type="submit" onClick={handleSubmitAdd(onSubmitAdd)}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
			<FloatingBar>
				<ActionButton disabled={addLoading} color="primary" size="medium" onClick={handleClickOpen}>
					<AddIcon />
				</ActionButton>
			</FloatingBar>
		</AssetList>
	);
};

export default AssetsForm;

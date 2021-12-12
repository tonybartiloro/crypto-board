import { useState, useEffect } from "react";
import { useUserAssets, useAssets, useUserAssetAdd, useUserAssetDelete, useUserAssetsEdit } from "../../hooks/";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useForm, useFieldArray } from "react-hook-form";
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
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { default as MuiDialog } from "@mui/material/Dialog";
import { default as MuiDialogTitle } from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";

const schemaAdd = yup
	.object({
		symbol: yup.string().required(),
		amount: yup.string().required(),
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

const WalletForm = ({}) => {
	const isUpMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const { assets, loading: loadingAssets } = useAssets();

	const { assets: userAssets, loading: loadingUserAssets, mutate: updateUserAssets } = useUserAssets();

	const { action: addAsset, loading: addLoading } = useUserAssetAdd();

	const { action: deleteAsset, loading: deleteLoading } = useUserAssetDelete();

	const { action: editAssets, loading: editLoading } = useUserAssetsEdit();

	const missingUserAssets = assets.filter((asset) => userAssets.find((userAsset) => asset.symbol === userAsset.symbol) === undefined);

	const schema = yup
		.object(
			userAssets.reduce(
				(obj, item) => ({
					...obj,
					[item["symbol"]]: yup.string().required("amount is a required field"),
				}),
				{}
			)
		)
		.required();

	const {
		control,
		handleSubmit,
		formState: { errors },
		register,
		unregister,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const {
		control: controlAdd,
		handleSubmit: handleSubmitAdd,
		formState: { errors: errorsAdd },
		register: registerAdd,
		reset: resetAdd,
	} = useForm({
		resolver: yupResolver(schemaAdd),
		defaultValues: {
			symbol: "",
			amount: "",
		},
	});

	const onSubmit = async (assets) => {
		await editAssets({ assets });
		updateUserAssets();
	};

	const onSubmitAdd = async ({ symbol, amount }) => {
		handleClose();
		await addAsset({
			symbol,
			amount,
		});
		updateUserAssets();
		resetAdd();
	};

	const onAssetDelete = async ({ symbol }) => {
		await deleteAsset({
			symbol,
		});

		await updateUserAssets();

		unregister(symbol);
	};

	return (
		<AssetList>
			<form>
				{userAssets.map(({ symbol, logo, amount }) => (
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
						<Stack direction={isUpMd ? "row" : "column"} spacing={2}>
							<Stack direction="row" spacing={2} alignItems="center">
								<IconButton disabled={deleteLoading} color="inherit" onClick={() => onAssetDelete({ symbol })}>
									<DeleteIcon />
								</IconButton>
								<Avatar alt={symbol} src={logo} />
								<Typography component="p" variant="h5">
									{symbol}
								</Typography>
							</Stack>
							<TextField
								type="number"
								name={`${symbol}`}
								defaultValue={amount}
								required
								error={errors?.[symbol]?.type === "required"}
								helperText={errors?.[symbol]?.message || " "}
								label="Amount"
								{...register(symbol)}
							/>
						</Stack>
					</Paper>
				))}
				{loadingUserAssets && !userAssets.length && <Skeleton />}
			</form>
			<Dialog onClose={handleClose} open={open} fullWidth>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Add new asset
				</DialogTitle>
				<DialogContent dividers>
					<form>
						<Stack direction="column" spacing={4}>
							<TextField
								label="Asset"
								name="symbol"
								required
								select
								defaultValue=""
								{...registerAdd("symbol")}
								error={errorsAdd.asset?.type === "required"}
								helperText={errorsAdd.asset?.message || " "}
							>
								<MenuItem key={""} value={""}>
									<Typography component="p" variant="p">
										{"Select asset"}
									</Typography>
								</MenuItem>
								{missingUserAssets.map(({ symbol, logo }) => (
									<MenuItem key={symbol} value={symbol}>
										<Stack direction="row" spacing={1} alignItems="center">
											<Avatar alt={symbol} src={logo} />
											<Typography component="p" variant="p">
												{symbol}
											</Typography>
										</Stack>
									</MenuItem>
								))}
							</TextField>

							<TextField
								type="number"
								name="amount"
								required
								error={errorsAdd.amount?.type === "required"}
								helperText={errorsAdd.amount?.message || " "}
								label="Amount"
								{...registerAdd("amount")}
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
				<ActionButton
					disabled={editLoading || userAssets.length === 0}
					color="secondary"
					size="medium"
					type="submit"
					onClick={handleSubmit(onSubmit)}
				>
					<SaveIcon />
				</ActionButton>
				<ActionButton disabled={addLoading || missingUserAssets.length === 0} color="primary" size="medium" onClick={handleClickOpen}>
					<AddIcon />
				</ActionButton>
			</FloatingBar>
		</AssetList>
	);
};

export default WalletForm;

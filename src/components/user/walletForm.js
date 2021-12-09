import { useEffect } from "react";
import { useUserAssets } from "../../hooks/";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Skeleton from "../misc/skeleton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Button from "@mui/material/Button";

const schema = yup.object().shape({
	assets: yup.array().of(
		yup.object().shape({
			value: yup.string().required("Amount is required"),
		})
	),
});

const WalletForm = ({}) => {
	const { assets: userAssets, loading: loadingUserAssets } = useUserAssets();

	const {
		control,
		handleSubmit,
		formState: { errors },
		register,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { fields, append, remove } = useFieldArray({ name: "assets", control });

	useEffect(() => {
		if (fields.length < userAssets.length) {
			for (let i = 0; i < parseInt(userAssets.length || 0); i++) {
				append({ value: userAssets[i].amount });
			}
		}
	}, [userAssets, fields, append, remove]);

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form>
			<Button type="submit" onClick={handleSubmit(onSubmit)} variant="primary">
				Save
			</Button>
			{fields.map((item, i) => (
				<Paper
					key={userAssets[i].symbol}
					elevation={4}
					sx={{
						p: 2,
						mt: 2,
						display: "flex",
						flexDirection: "column",
						//height: 240,
					}}
				>
					<Stack direction="row" spacing={2} alignItems="center">
						<IconButton color="inherit">
							<DeleteIcon />
						</IconButton>
						<Avatar alt={userAssets[i].symbol} src={userAssets[i].logo} />
						<Typography component="p" variant="h5">
							{userAssets[i].symbol}
						</Typography>
						{/* <Controller
							name={`assets[${i}]value`}
							control={control}
							render={({ field }) => (
								<TextField
									type="number"
									//defaultValue={userAssets[i].amount}
									required
									error={errors.assets?.[i]?.value?.type === "required"}
									helperText={errors.assets?.[i]?.value?.message || " "}
									label="Amount"
									{...field}
								/>
							)}
						/> */}
						<TextField
							type="number"
							name={`assets[${i}]value`}
							//defaultValue={userAssets[i].amount}
							required
							error={errors.assets?.[i]?.value?.type === "required"}
							helperText={errors.assets?.[i]?.value?.message || " "}
							label="Amount"
							{...register(`assets.${i}.value`)}
						/>
					</Stack>
				</Paper>
			))}
			{loadingUserAssets && <Skeleton />}
		</form>
	);
};

export default WalletForm;

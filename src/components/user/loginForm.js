import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useUserLogin } from "../../hooks";
import { useUserContext } from "../../contexts";

const schema = yup
	.object({
		username: yup.string().required(),
	})
	.required();

const LoginForm = ({ afterLogin }) => {
	const { onLogin } = useUserContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			username: "",
		},
	});

	const { action: login, loading: loginLoading } = useUserLogin();

	const onSubmit = async (data) => {
		const userData = await login(data);
		if (userData.userId) {
			onLogin(userData);
			afterLogin();
		}
	};

	return (
		<form>
			<Stack direction="column" spacing={2} p={2}>
				<Controller
					name={"username"}
					control={control}
					render={({ field }) => (
						<TextField
							required
							error={errors.username?.type === "required"}
							helperText={errors.username?.message || " "}
							label="Username"
							{...field}
						/>
					)}
				/>
				<Button type="submit" disabled={loginLoading} onClick={handleSubmit(onSubmit)} variant="primary">
					Login
				</Button>
			</Stack>
		</form>
	);
};

export default LoginForm;

import Typography from "@mui/material/Typography";

const Footer = () => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
			{"Copyright © Crypto Board "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

export default Footer;

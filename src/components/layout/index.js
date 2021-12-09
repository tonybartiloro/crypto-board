import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Footer from "./footer";
import Drawer from "./drawer";
import AppBar from "./appBar";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = ({ children }) => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const isDownMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

	const _openDrawer = isDownMd ? false : openDrawer;

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar onOpenDrawer={toggleDrawer} open={_openDrawer} />
			<Drawer onClose={toggleDrawer} open={_openDrawer} />
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
					flexGrow: 1,
					height: "100vh",
					overflow: "auto",
				}}
			>
				<Container sx={{ mt: 2, mb: 2 }} style={{ maxWidth: "none" }}>
					<Toolbar />
					{children}
					<Footer />
				</Container>
			</Box>
		</Box>
	);
};

export default Layout;

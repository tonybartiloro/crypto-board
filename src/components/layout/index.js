import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Footer from "./footer";
import Drawer from "./drawer";
import AppBar from "./appBar";

const Layout = ({ children }) => {
	const [openDrawer, setOpenDrawer] = useState(true);
	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar onOpenDrawer={toggleDrawer} open={openDrawer} />
			<Drawer onClose={toggleDrawer} open={openDrawer} />
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

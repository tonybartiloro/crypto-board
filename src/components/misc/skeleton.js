import { default as MuiSkeleton } from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Skeleton = () => {
	return (
		<Box>
			<MuiSkeleton />
			<MuiSkeleton animation="wave" />
			<MuiSkeleton animation={false} />
		</Box>
	);
};

export default Skeleton;

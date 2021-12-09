import { default as MuiSkeleton } from "@mui/material/Skeleton";

const Skeleton = () => {
	return (
		<div>
			<MuiSkeleton />
			<MuiSkeleton animation="wave" />
			<MuiSkeleton animation={false} />
		</div>
	);
};

export default Skeleton;

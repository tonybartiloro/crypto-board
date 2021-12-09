import { createTheme } from "@mui/material/styles";
const htmlFontSize = 14;
const fontSize = 14;
const font = {
	regular: "Arial, sans-serif",
	bold: "Arial Bold, sans-serif",
};

const muiTheme = createTheme({ typography: { htmlFontSize, fontSize } });

const theme = createTheme({
	direction: "ltr",
	/* palette: {
		common: {
			black: "#141616",
			white: "#fff",
		},
		mode: "light",
		primary: {
			main: "#141616",
			light: "#434445",
			dark: "#000000",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#005DFF",
			light: "#669EFF",
			dark: "#024ED0",
			contrastText: "#FFFFFF",
		},
		contrastThreshold: 3,
		tonalOffset: 0.2,
		text: {
			primary: "#000000",
			secondary: "#005DFF",
			disabled: "#fafafa",
		},
	}, */
	typography: {
		fontFamily: "Arial, sans-serif",
		fontFamilyBold: "Arial Bold, sans-serif",
		htmlFontSize,
		fontSize,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(40),
			lineHeight: 1,
			letterSpacing: "0.2px",
		},
		h2: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(32),
			lineHeight: 1.185,
			letterSpacing: "0.2px",
		},
		h3: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(28),
			lineHeight: 1.167,
			letterSpacing: "0.2px",
		},
		h4: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(24),
			lineHeight: 1.235,
			letterSpacing: "0.2px",
		},
		h5: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(20),
			lineHeight: 1.2,
			letterSpacing: "0.2px",
		},
		h6: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(18),
			lineHeight: 1.15,
			letterSpacing: "0.2px",
		},
		subtitle1: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(14),
			lineHeight: 1.75,
			letterSpacing: "0.2px",
		},
		subtitle2: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(16),
			lineHeight: 1.57,
			letterSpacing: "0.2px",
		},
		body1: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(14),
			lineHeight: 1.6,
			letterSpacing: "0.2px",
		},
		body2: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(14),
			lineHeight: 1.6,
			letterSpacing: "0.2px",
		},
		button: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(14),
			lineHeight: 1.3,
			letterSpacing: "0.2px",
		},
		caption: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(12),
			lineHeight: 1.4,
			letterSpacing: "0.2px",
		},
		overline: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(12),
			lineHeight: 2.66,
			letterSpacing: "0.2px",
			textTransform: "uppercase",
		},
		headlinebig: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(90),
			lineHeight: 1,
			letterSpacing: "0.2px",
		},
		headlinemedium: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(86),
			lineHeight: 1,
			letterSpacing: "0.2px",
		},
		headlinesmall: {
			fontFamily: font.bold,
			fontWeight: 700,
			fontSize: muiTheme.typography.pxToRem(78),
			lineHeight: 1,
			letterSpacing: "0.2px",
		},
		subheadline1: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(24),
			lineHeight: 1.2,
			letterSpacing: "0.2px",
		},
		subheadline2: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(20),
			lineHeight: 1.2,
			letterSpacing: "0.2px",
		},
		checkbox: {
			fontFamily: font.regular,
			fontWeight: 400,
			fontSize: muiTheme.typography.pxToRem(12),
			lineHeight: "16px",
			letterSpacing: "0.2px",
		},
	},
});

export default theme;

import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#940de3e5',
            dark: '#000000',
        },
        secondary: {
            main: '#940de3e5',
            light: '#ae67f6',
            contrastText: '#47008F',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default defaultTheme;

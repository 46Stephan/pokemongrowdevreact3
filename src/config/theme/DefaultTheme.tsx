import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#e3350d',
            dark: '#000',
        },
        secondary: {
            main: '#feca1b',
            light: '#F5EBFF',
            contrastText: '#47008F',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default defaultTheme;

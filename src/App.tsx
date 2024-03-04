
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';


import AppRoutes from './routes/AppRoutes';
import { persistor, store } from './store';
import defaultTheme from './config/theme/DefaultTheme';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;


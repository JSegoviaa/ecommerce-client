import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { AdminProvider, AuthProvider, UiProvider } from '../contexts';
import { lightTheme } from '../themes';
import '../styles/globals.css';
import { API_TOKEN } from '../env';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (resource) =>
            fetch(resource, {
              headers: { 'api-token': API_TOKEN },
            }).then((res) => res.json()),
        }}
      >
        <AdminProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </AdminProvider>
      </SWRConfig>
    </AuthProvider>
  );
}

export default MyApp;

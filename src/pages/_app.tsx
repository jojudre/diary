import React from 'react';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { DiaryContextProvider } from 'providers';

import 'css/App.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <DiaryContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </DiaryContextProvider>
);

export default App;

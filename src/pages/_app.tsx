import React from 'react';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import 'css/App.scss';
import { DiaryContextProvider } from 'providers';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DiaryContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </DiaryContextProvider>
    );
}

/** @format */

import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout: FC<LayoutProps> = ({
  children,
  title = 'My dairy',
  description = 'Best diary app with text editor tool',
}) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="HandheldFriendly" content="true" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
    </div>
  </>
);

export default Layout;

import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { AdminNavbar, DashboardSidebar } from '../ui';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const AdminLayout: FC<Props> = (props) => {
  const { children, title, description, image, url } = props;

  return (
    <>
      <Head>
        <title>{title ? title : 'Título'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:title" content={title ? title : 'Títilo'} />
        <meta
          property="og:description"
          content={description ? description : 'Descripción'}
        />
        <meta property="og:image" content={image ? image : 'Imagen'} />

        <meta property="og:url" content={url ? url : 'URL'} />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <DashboardSidebar />

      <main>{children}</main>
    </>
  );
};

export default AdminLayout;

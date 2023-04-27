import React from 'react';

import { api } from '~/utils/api';

import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default api.withTRPC(RootLayout);

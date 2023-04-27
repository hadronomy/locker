import React from 'react';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { dark } from '@clerk/themes';

import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="dark" lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: 'hsl(223 47% 11%)',
            colorText: 'hsl(213 31% 91%)'
          }
        }}
      >
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}

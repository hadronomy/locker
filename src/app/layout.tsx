import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { dark } from '@clerk/themes';

import { Navbar } from '~/components/ui/Navbar';

import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const navbarLinks = [
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Pricing',
    href: '/pricing'
  }
];

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="dark" lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: 'hsl(223 47% 11%)',
            colorText: 'hsl(213 31% 91%)',
            colorPrimary: 'hsl(210 40% 98%)',
            colorTextOnPrimaryBackground: 'hsl(222.2 47.4% 1.2%)',
            colorDanger: 'hsl(0 70% 50%)',
            colorInputBackground: 'hsl(224 71% 4%)'
          }
        }}
      >
        <body>
          <Navbar links={navbarLinks} />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}

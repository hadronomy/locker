import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { dark } from '@clerk/themes';
import { Urbanist } from 'next/font/google';

import { Navbar } from '~/components/ui/Navbar';

import '~/styles/globals.css';

const urbanistFont = Urbanist({
  weight: ['100', '200', '300', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});

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
    <html className={`${urbanistFont.className} dark`} lang="en">
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
          <Navbar links={navbarLinks} placement="static" border="none" />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}

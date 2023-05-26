import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Urbanist } from 'next/font/google';
import Link from 'next/link';

import {
  Navbar,
  NavbarLayout,
  NavbarLinks,
  type NavbarLink
} from '~/components/ui/navbar';
import { NavbarLogin } from '~/components/ui/navbar-login';
import { Separator } from '~/components/ui/separator';
import { TRPCProvider } from '~/components/provider/TRPCProvider';

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
    type: 'dropdown',
    content: {
      links: [
        {
          label: 'example',
          href: '/example'
        }
      ]
    }
  },
  {
    label: 'Pricing',
    type: 'link',
    href: '/pricing'
  }
] satisfies NavbarLink[];

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
          <Navbar placement="static" border="none">
            <NavbarLayout>
              <div className="inline-flex">
                <Link href="/">
                  <h1 className="text-xl font-extrabold tracking-tighter">
                    Locker
                  </h1>
                </Link>
              </div>
              <div className="flex w-full items-end justify-end">
                <NavbarLinks
                  className="hidden flex-grow-0 md:inline-flex"
                  links={navbarLinks}
                />
              </div>
              <Separator
                className="hidden h-[30px] md:inline-flex"
                orientation="vertical"
                decorative
              />
              <NavbarLogin />
            </NavbarLayout>
          </Navbar>
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}

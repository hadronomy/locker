import { ClerkProvider } from '@clerk/nextjs/app-beta';
import { dark } from '@clerk/themes';
import { Urbanist } from 'next/font/google';
import Link from 'next/link';

import { Navbar, NavbarLayout } from '~/components/ui/Navbar';
import { NavbarLogin } from '~/components/ui/NavbarLogin';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from '~/components/ui/NavigationMenu';
import { Separator } from '~/components/ui/Separator';

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
          <Navbar placement="static" border="none">
            <NavbarLayout>
              <div className="inline-flex">
                <Link href="/">
                  <h1 className="text-xl font-extrabold tracking-tighter">
                    Locker
                  </h1>
                </Link>
              </div>
              <NavigationMenu className="hidden items-end justify-end md:inline-flex">
                <NavigationMenuList>
                  {navbarLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                      <Link
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <Separator
                className="hidden h-[30px] md:inline-flex"
                orientation="vertical"
                decorative
              />
              <NavbarLogin />
            </NavbarLayout>
          </Navbar>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}

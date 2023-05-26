import { Button } from '~/components/ui/button';
import { Navbar, NavbarLayout } from '~/components/ui/navbar';
import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function PanelLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar>
        <NavbarLayout className="p-0 pl-2">
          <Button
            className="relative font-bold hover:no-underline"
            variant="link"
          >
            Overview
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white"></div>
          </Button>
        </NavbarLayout>
      </Navbar>
      {children}
    </>
  );
}

import { Navbar, NavbarLayout } from '~/components/ui/Navbar';
import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function PanelLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar>
        <NavbarLayout></NavbarLayout>
      </Navbar>
      {children}
    </>
  );
}

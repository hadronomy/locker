import '~/styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function PanelLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}

import { UserButton } from '@clerk/nextjs/app-beta';

export default function PanelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-y-5 px-4 py-16 ">
        <UserButton />
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          The <span className="text-[hsl(280,100%,70%)]">Panel</span>
        </h1>
        <h2 className="text-2xl font-bold tracking-tighter text-white">
          <span className="text-[hsl(280,100%,70%)]">Under</span> Construction
        </h2>
      </div>
    </main>
  );
}

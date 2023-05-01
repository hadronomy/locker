export const metadata = {
  title: 'Locker - Home'
};

export default function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <section className="container flex h-screen flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="tracking-tigh text-center text-4xl font-extrabold text-white md:text-7xl">
            <p>
              <span className="bg-gradient-to-br from-gray-500 via-indigo-500 to-purple-200 bg-clip-text text-transparent">
                Unlocks
              </span>{' '}
              Your Heart
            </p>
            <p>
              Locks{' '}
              <span className="bg-gradient-to-br from-gray-500 via-indigo-500 to-purple-200 bg-clip-text text-transparent">
                Everything Else
              </span>
            </p>
          </h1>
          <h1 className="bg-gradient-to-br from-gray-500 via-indigo-500 to-purple-200 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent text-white sm:text-[5rem]"></h1>
        </section>
      </main>
    </>
  );
}

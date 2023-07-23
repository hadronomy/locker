import { SignIn } from '@clerk/nextjs';

export const runtime = 'edge';

export const metadata = {
  title: 'Locker - Signin'
};

export default function SignInPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <SignIn signUpUrl="/signup" />
    </div>
  );
}

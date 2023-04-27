import { SignIn } from '@clerk/nextjs/app-beta';

export default function SignInPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-black">
      <SignIn signUpUrl="/signup" />
    </div>
  );
}

import { SignUp } from '@clerk/nextjs/app-beta';

export default function SignUpPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-black">
      <SignUp signInUrl="/signin" />
    </div>
  );
}

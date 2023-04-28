import { SignUp } from '@clerk/nextjs/app-beta';

export const metadata = {
  title: 'Locker - Signup'
};

export default function SignUpPage() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center">
      <SignUp signInUrl="/signin" />
    </div>
  );
}

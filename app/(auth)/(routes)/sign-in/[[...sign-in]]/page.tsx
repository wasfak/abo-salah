import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        appearance={{ variables: { colorPrimary: "#0f172a" } }}
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  );
}

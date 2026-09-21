import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, googleEnabled } from "../../lib/auth";
import { loginErrorMessage } from "../../lib/login-errors";
import LoginClient from "../../components/pages/LoginClient";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin/experience");

  const { error } = await searchParams;
  return <LoginClient hasGoogle={googleEnabled} error={loginErrorMessage(error)} />;
}

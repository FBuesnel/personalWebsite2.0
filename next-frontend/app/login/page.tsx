import type { Metadata } from "next";
import { googleEnabled } from "../../lib/auth";
import LoginClient from "../../components/pages/LoginClient";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient hasGoogle={googleEnabled} />;
}

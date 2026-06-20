import type { Metadata } from "next";

import "../styles/globals.css";
import AppWrapper from "@/components/AppWrapper";



export const metadata: Metadata = {
  title: "Ranajob - Find Work Near You",
  description: "Connect with thousands of opportunities across Nigeria. From tech to teaching, home services to fashion — your next gig is here.",
  keywords: "jobs Nigeria, freelance, hire professionals, service providers, Lagos jobs, Abuja, Port Harcourt, Ibadan, lesson teacher, home services, catering, tailoring",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={""}>
        <AppWrapper> {children}</AppWrapper>
      </body>
    </html>
  );
}

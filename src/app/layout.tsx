import type { Metadata } from "next";

import "../styles/globals.css";
import AppWrapper from "@/components/AppWrapper";



export const metadata: Metadata = {
  title: "Rana - Find Your Next Job",
  description: "Rana connects job seekers with top opportunities in tech, teaching, and more.",
  keywords: "jobs, hiring, tech, teaching, remote work",
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

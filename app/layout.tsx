import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../components/navbar";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumePool",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">
          <Nav />
          <div className="flex justify-center items-center p-24">
            <SignedIn>
              {children}
            </SignedIn>
            <SignedOut>
              {children}
            </SignedOut>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
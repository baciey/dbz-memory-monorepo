"use client";

import { Providers } from "../components/Providers";
import { Navbar } from "../components/Navbar";
import "../styles/global.css";
import { AuthModal } from "@repo/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <AuthModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}

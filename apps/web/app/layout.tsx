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
        <script src="https://accounts.google.com/gsi/client" async></script>

        <Providers>
          <Navbar />
          <AuthModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}

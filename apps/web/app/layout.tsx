"use client";

import { Providers } from "../components/Providers";
import { Navbar } from "../components/Navbar";
import "../styles/global.css";
import { AuthModal } from "@repo/ui";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          {isLoaded ? (
            <>
              <Navbar />
              <AuthModal />
              {children}
            </>
          ) : (
            <div className="loader">
              <div className="loading-circle"></div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}

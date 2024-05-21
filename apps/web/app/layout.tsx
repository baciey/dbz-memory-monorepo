import { Providers } from "../components/Providers";
import { Navbar } from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const style = { height: "100%" };
  return (
    <html lang="en" style={style}>
      <body style={style}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

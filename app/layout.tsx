import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sync - Landing",
  description: "Think alike. Connect deeper.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

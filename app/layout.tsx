import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote of the Day",
  description: "A simple daily quote, deterministic per UTC day.",
  metadataBase: new URL("https://agentic-07278135.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Guxi",
  description: "Tweet your GitHub launches automatically using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les apprentis sorciers",
  description: "Un jeu magique pour sorciers curieux ✨",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </head>
      <body className="bg-background text-white font-comic">
        <main className="max-w-3xl mx-auto flex-1">{children}</main>
      </body>
    </html>
  );
}

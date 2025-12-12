import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { MyListProvider } from "@/contexts/MyListContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kiraanime.com'),
  title: {
    default: "KiraAnime - Watch Anime Online Free in HD Quality",
    template: "%s | KiraAnime"
  },
  description: "Stream thousands of anime series and movies free in HD. Watch One Piece, Jujutsu Kaisen, Demon Slayer, and more popular anime with English subtitles and dubs.",
  keywords: ["anime", "watch anime online", "free anime", "anime streaming", "HD anime", "English subtitles", "anime movies", "anime series", "One Piece", "Naruto", "Demon Slayer", "Jujutsu Kaisen"],
  authors: [{ name: "KiraAnime" }],
  creator: "KiraAnime",
  publisher: "KiraAnime",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kiraanime.com",
    title: "KiraAnime - Watch Anime Online Free in HD Quality",
    description: "Stream thousands of anime series and movies free in HD. Watch One Piece, Jujutsu Kaisen, Demon Slayer, and more popular anime with English subtitles and dubs.",
    siteName: "KiraAnime",
  },
  twitter: {
    card: "summary_large_image",
    title: "KiraAnime - Watch Anime Online Free in HD Quality",
    description: "Stream thousands of anime series and movies free in HD. Watch popular anime with English subtitles and dubs.",
    creator: "@kiraanime",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://kiraanime.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <MyListProvider>
          {children}
        </MyListProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
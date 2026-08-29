import { Geist, Geist_Mono } from "next/font/google";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BAS",
  description: "ซื้อขายไอดีเกม",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
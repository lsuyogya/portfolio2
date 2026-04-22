import "./globals.css";
import type { Metadata } from "next";
import { Rubik_Moonrocks } from "next/font/google";
import localFont from "next/font/local";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const pixel = Rubik_Moonrocks({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});
const pixelify = localFont({
  src: "../public/fonts/pixelify_sans/PixelifySans-VariableFont_wght.ttf",
  variable: "--font-pixelify",
});

const pixelOperator = localFont({
  src: "../public/fonts/pixel_operator/PixelOperator.ttf",
  variable: "--font-pixelOperator",
});

export const metadata: Metadata = {
  title: "Suyogya Luitel",
  description: "Portfolio site for me.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${pixelify.variable} ${pixelOperator.variable}`}
    >
      <body className={""}>{children}</body>
    </html>
  );
}

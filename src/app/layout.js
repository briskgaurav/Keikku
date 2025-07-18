import localFont from "next/font/local";
import "./globals.css";
import LenisSmoothScroll from "./SmoothScroll/LenisScroll";
import Navbar from "./Navbar/Navbar";

export const metadata = {
  title: "Keikku",
  description: "Generated by create next app",
  
};

const DMM = localFont({
  src: [{ path: "./fonts/DMM.woff2", weight: "400", style: "normal" }],
  variable: "--font-DMM",
  display: "swap",
  fallback: ["system-ui, sans-serif"],
});

const Mori = localFont({
  src: [{ path: "./fonts/Mori.ttf", weight: "400", style: "normal" }],
  variable: "--font-Mori",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <>
        <LenisSmoothScroll />
      </>
      <body className={`${DMM.variable} ${Mori.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import "./styles/main.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
});
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <Navbar /> {/* SERVER COMPONENT */}
        {children}
         <Footer /> {/* SERVER COMPONENT */}
      </body>
    </html>
  );
}
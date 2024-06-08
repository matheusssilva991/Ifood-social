import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/app/components/header/Header";
import { Footer } from "@/app/components/footer/Footer";

import "./globals.css";
import "primereact/resources/themes/saga-orange/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IFood Social",
  description: "IFood Social - Um sistema para amantes de comida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className + ' flex flex-col min-h-screen'}>
          <Header></Header>
        <main className="flex-1">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}

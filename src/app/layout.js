import { Mulish } from "next/font/google";
import { Footer } from "@/components";
import { AppWrapper } from "@/context";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Pasarela-Web3",
  description: "Prueba tecnica de Bitnovo, realizada en NextJs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <AppWrapper>
          {children}
          <div className="flex justify-center">
            <Footer />
          </div>
        </AppWrapper>
      </body>
    </html>
  );
}

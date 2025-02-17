import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Fun APp!!!",
  description: "Generated for Fun ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
       
        {children}
      </body>
    </html>
  );
}

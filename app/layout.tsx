"use client";
import { StoreContext } from "@/context/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreContext>
          <div className="bg-gray-100">
            <div className="container mx-auto px-4">{children}</div>
          </div>
        </StoreContext>
      </body>
    </html>
  );
}

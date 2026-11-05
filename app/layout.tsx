import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idfa3li - ادفعلي | ادفع بأمان",
  description: "منصة ادفعلي للدفع الآمن والسهل في الأردن",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

import './globals.css'
export const metadata = { title: 'ادفعلي | منصة خيرية من أهل الأردن لأهل الأردن', description: 'ادفعلي منصة خيرية مجانية - بدون وسيط مالي، بدون عمولة' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>
}

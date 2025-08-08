
import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <nav style={{ display: "flex", gap: 16, padding: 16, borderBottom: "1px solid #eee" }}>
          <Link href="/">الرئيسية</Link>
          <Link href="/courses">الدورات</Link>
          <Link href="/dashboard">منطقتي</Link>
        </nav>
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  )
}


import Link from "next/link"

export default function Home() {
  return (
    <section>
      <h1>منصّة دورات عبدالله</h1>
      <p>تصفح الدورات وابدأ التعلم.</p>
      <Link href="/courses">اذهب إلى الدورات →</Link>
    </section>
  )
}

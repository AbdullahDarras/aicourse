
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function Courses() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <section>
      <h1>الدورات</h1>
      <ul>
        {courses.map(c => (
          <li key={c.id} style={{ marginBottom: 12 }}>
            <strong>{c.title}</strong>
            <div>{c.description}</div>
            <Link href={`/courses/${c.slug}`}>التفاصيل</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

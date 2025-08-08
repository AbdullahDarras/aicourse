
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth()
  const userId = session?.user?.id as string
  const enrollments = await prisma.enrollment.findMany({ where: { userId }, include: { course: true } })
  return (
    <section>
      <h1>منطقة المشترك</h1>
      <ul>
        {enrollments.map(e => (
          <li key={e.id}><Link href={`/courses/${e.course.slug}/learn`}>{e.course.title}</Link></li>
        ))}
      </ul>
    </section>
  )
}


import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const session = await auth()
  const course = await prisma.course.findUnique({ where: { slug: params.slug } })
  if (!course) return <div>الدورة غير موجودة</div>

  let enrolled = false
  if (session?.user?.id) {
    const e = await prisma.enrollment.findUnique({ where: { userId_courseId: { userId: session.user.id as string, courseId: course.id } } })
    enrolled = !!e
  }

  return (
    <section>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>السعر: {(course.priceCents/100).toFixed(2)} USD</p>
      {enrolled ? (
        <Link href={`/courses/${course.slug}/learn`}>ادخل إلى الدروس</Link>
      ) : (
        <form action={`/api/checkout?courseId=${course.id}`} method="POST">
          <button type="submit">اشترِ الآن</button>
        </form>
      )}
    </section>
  )
}


import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export default async function LearnPage({ params }: { params: { slug: string } }) {
  const session = await auth()
  const userId = session?.user?.id as string
  const course = await prisma.course.findUnique({ where: { slug: params.slug }, include: { lessons: { orderBy: { order: "asc" } } } })
  if (!course) return <div>الدورة غير موجودة</div>

  const enrolled = await prisma.enrollment.findUnique({ where: { userId_courseId: { userId, courseId: course.id } } })
  if (!enrolled) return <div>ليس لديك صلاحية لهذه الدورة.</div>

  return (
    <section>
      <h1>{course.title} - الدروس</h1>
      <ol>
        {course.lessons.map(l => (
          <li key={l.id}><strong>{l.title}:</strong> {l.content}</li>
        ))}
      </ol>
    </section>
  )
}

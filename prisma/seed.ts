
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

async function main() {
  // Create course
  const course = await db.course.upsert({
    where: { slug: 'ai-for-designers' },
    update: {},
    create: {
      title: 'مدخل إلى الذكاء الاصطناعي للمصممين',
      slug: 'ai-for-designers',
      description: 'تعلم كيف تدمج أدوات الذكاء الاصطناعي في عملية التصميم.',
      priceCents: 4900,
      lessons: {
        create: [
          { title: 'مقدمة', content: 'نص/رابط فيديو', order: 1 },
          { title: 'تدفق العمل', content: 'نص/رابط فيديو', order: 2 },
        ]
      }
    }
  });

  // Demo user (for preview without Stripe)
  const email = 'demo@abdullah.dev';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Demo User', hashedPassword }
  });

  // Enroll demo user to the course
  await db.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    update: {},
    create: { userId: user.id, courseId: course.id }
  });

  console.log('Seeded. Login with demo user:');
  console.log('Email:', email);
  console.log('Password:', password);
}

main().finally(()=>db.$disconnect());


# AI Courses SaaS – Skeleton

هيكلية عمل كاملة لموقع بيع الدورات مع:
- Next.js 14 (App Router) + TypeScript
- مصادقة NextAuth (Credentials)
- Prisma + SQLite (تطوير) – يمكنك التبديل إلى Postgres بسهولة
- Stripe Checkout + Webhook
- حماية الوصول للدروس حسب الاشتراك

## التشغيل محليًا
1) ثبت الحزم:
```bash
npm install
```
2) أنشئ ملف البيئة:
```bash
cp .env.example .env
```
- غيّر `NEXTAUTH_SECRET` لقيمة عشوائية قوية.
- ضع مفتاح Stripe السري و Webhook secret عند الاختبار.

3) حضّر قاعدة البيانات:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

4) شغل السيرفر:
```bash
npm run dev
```

## التدفقات الأساسية (UX Flow)
- الزائر يتصفح `/courses` → يدخل صفحة تفاصيل الدورة → يضغط شراء
- إذا لم يكن مسجلاً، يُطلب منه تسجيل الدخول/التسجيل
- ينقل إلى Stripe Checkout
- عند الدفع، يعود إلى `/courses/[slug]/learn`، والدروس تصبح متاحة (webhook يضيف Enrollment)

## أين أعدل؟
- نموذج البيانات: `prisma/schema.prisma`
- واجهات الصفحات: `app/*`
- التسجيل وتسجيل الدخول: `/register` و `/login`
- إنشاء جلسة الدفع: `app/api/checkout/route.ts`
- استقبال Webhook: `app/api/webhooks/stripe/route.ts`

> هذا Skeleton وظيفي وبسيط بصريًا، ومركّز على تجربة الاستخدام وتدفق الدفع والدخول والوصول للدورات.


---
## النشر (Deployment)

### خيار 1: Vercel (مُستحسن)
> ملاحظة: استخدم **Postgres** بدل SQLite في الإنتاج.
1) أنشئ قاعدة Postgres (Neon/Supabase) وخذ `DATABASE_URL`.
2) اربط المستودع على Vercel واضف المتغيرات:
   - `DATABASE_URL` (Postgres)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (رابط موقعك على Vercel)
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
3) شغّل build الافتراضي. بعد النشر:
   - نفّذ `npx prisma migrate deploy` من Vercel (أو شغّل migration hook).
4) أضف Webhook على Stripe إلى: `https://<domain>/api/webhooks/stripe`.

### خيار 2: Render
1) ارفع المشروع إلى GitHub.
2) في Render: New + From repo → اختر المشروع.
3) Render سيقرأ `render.yaml` تلقائيًا.
4) أضف متغيرات البيئة المذكورة أعلاه.
5) أنشر الخدمة وشغّل `migrate deploy` تلقائيًا ضمن startCommand.

### خيار 3: Docker (VPS)
- استخدم `Dockerfile` المرفق:
```bash
docker build -t ai-courses-saas .
docker run -p 3000:3000 --env-file .env.production ai-courses-saas
```

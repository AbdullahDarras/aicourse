
"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div>
      <h1>تسجيل الدخول</h1>
      <input placeholder="البريد" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="كلمة المرور" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={()=>signIn("credentials", { email, password, callbackUrl: "/" })}>دخول</button>
      <div>ما عندك حساب؟ <Link href="/register">سجل هنا</Link></div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Login(){
  const [email,setEmail]=useState('')
  const [ok,setOk]=useState(false)
  return (<main style={{maxWidth:480}}>
    <h1>เข้าสู่ระบบ</h1>
    {ok? <p className="meta">เราได้ส่งลิงก์เข้าสู่ระบบไปที่อีเมลแล้ว โปรดเช็คกล่องจดหมาย</p> :
    <form onSubmit={async e=>{e.preventDefault(); await signIn('email', { email, redirect:false }); setOk(true)}}>
      <label>อีเมล<br/><input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
      <div style={{marginTop:10}}><button className="btn primary" type="submit">ส่งลิงก์เข้าสู่ระบบ</button></div>
    </form>}
  </main>)
}

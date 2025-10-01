'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export default function Nav(){
  const { data } = useSession()
  const pathname = usePathname()
  const active = (href:string)=> pathname===href ? { background:'rgba(94,234,212,.15)', borderColor:'rgba(94,234,212,.35)', color:'white'} : {}
  const isAdmin = (data?.user as any)?.role === 'ADMIN'
  return (
    <div className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand"><div className="logo" /> <span>Read now</span></Link>
        <div className="links" style={{flexWrap:'wrap'}}>
          <Link className="chip" style={active('/comics') as any} href="/comics">การ์ตูน</Link>
          <Link className="chip" style={active('/coins') as any} href="/coins">เติมเหรียญ</Link>
          <Link className="chip" style={active('/creators') as any} href="/creators">สำหรับนักเขียน</Link>
          <Link className="chip" style={active('/library') as any} href="/library">ชั้นหนังสือ</Link>
          {isAdmin && <Link className="chip" style={active('/admin') as any} href="/admin">แอดมิน</Link>}
          <Link className="chip" style={active('/login') as any} href="/login">เข้าสู่ระบบ</Link>
        </div>
        <div>{data?.user && <button className="btn" onClick={()=>signOut()}>ออกจากระบบ</button>}</div>
      </div>
    </div>
  )
}

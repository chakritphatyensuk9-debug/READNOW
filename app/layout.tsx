import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'
export const metadata = { title:'Read now', description:'แพลตฟอร์มอ่านการ์ตูนสมัยใหม่' }
export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (<html lang="th"><body><SessionProvider><Nav/><div className="container" style={{padding:'20px 0'}}>{children}</div><Footer/></SessionProvider></body></html>)
}

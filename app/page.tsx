import Link from 'next/link'
export default function Home(){
  return (<main>
    <section className="hero">
      <h1>Read now — พร้อมโปรดักชัน</h1>
      <p className="meta">Next.js • Postgres • Stripe • S3 • Email OTP • RBAC • Security Headers</p>
      <div style={{display:'flex', gap:8}}>
        <Link className="btn primary" href="/comics">เริ่มอ่าน</Link>
        <Link className="btn" href="/coins">เติมเหรียญ</Link>
      </div>
    </section>
  </main>)
}

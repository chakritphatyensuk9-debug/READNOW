import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const RATE = { windowMs: 60_000, max: 60 } // 60 req/min/IP
const store = new Map<string, { count:number, ts:number }>()

export async function middleware(req: any){
  const { pathname } = req.nextUrl
  // RBAC for admin
  if(pathname.startsWith('/admin') || pathname.startsWith('/api/admin')){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if(!token || token.role!=='ADMIN'){
      return NextResponse.json({ error:'forbidden' }, { status:403 })
    }
  }
  // Simple rate limit for /api/*
  if(pathname.startsWith('/api/')){
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const rec = store.get(ip) || { count:0, ts:now }
    if(now - rec.ts > RATE.windowMs){ rec.count=0; rec.ts=now }
    rec.count += 1
    store.set(ip, rec)
    if(rec.count > RATE.max){
      return NextResponse.json({ error:'rate_limited' }, { status:429 })
    }
  }
  return NextResponse.next()
}
export const config = { matcher: ['/admin/:path*','/api/:path*'] }

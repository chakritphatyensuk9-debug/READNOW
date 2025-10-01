import NextAuth from "next-auth"
import Email from "next-auth/providers/email"
import { db } from "@/lib/db"

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT||587),
        auth: { user: process.env.EMAIL_SERVER_USER, pass: process.env.EMAIL_SERVER_PASSWORD }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    async jwt({ token, user }){
      if(user?.email){
        const u = await db.user.upsert({
          where:{ email: user.email }, update:{},
          create:{ email: user.email }
        })
        token.role = u.role
        token.uid = u.id
      }
      return token
    },
    async session({ session, token }){
      (session.user as any).role = token.role
      ;(session.user as any).id = token.uid
      return session
    }
  }
})
export { handler as GET, handler as POST }

# Read now — Production Pack

สิ่งที่ปรับให้พร้อมโปรดักชัน:
- ✅ NextAuth **Email OTP** (ต้องตั้ง SMTP)
- ✅ Security headers (CSP, HSTS, XFO, Referrer-Policy, Permissions-Policy)
- ✅ robots.txt
- ✅ RBAC + rate-limit เบื้องต้นใน `middleware.ts`
- ✅ Stripe Webhook สำหรับเติมเหรียญ
- ✅ รองรับอัปโหลดไป S3 (ถ้าตั้ง ENV)

## Deploy (Vercel)
1) ตั้งค่าตัวแปรแวดล้อมตาม `.env.example`
2) กด Deploy → เสร็จแล้วรัน `npx prisma migrate deploy`
3) ทดสอบ `/login` (ส่งลิงก์เข้าอีเมล), `/coins` (Stripe test), อัปโหลด (ถ้าใช้ S3)

## หมายเหตุ
- อัตราเหรียญต่อราคาเป็นตัวอย่าง โปรดปรับในโค้ดที่เกี่ยวกับ Checkout
- Rate-limit ใน middleware ใช้หน่วยความจำโลคัล เหมาะกับ Node/VPS; ถ้าเป็น serverless ให้เปลี่ยนไปใช้ Redis

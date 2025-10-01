import Stripe from 'stripe'
import { db } from '@/lib/db'

export async function POST(req: Request){
  const sig = req.headers.get('stripe-signature') || ''
  const raw = await req.text()
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion:'2024-06-20' })
  let event: Stripe.Event
  try{
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  }catch(err:any){
    return new Response(`Webhook Error: ${err.message}`, { status:400 })
  }
  if(event.type==='checkout.session.completed'){
    const s = event.data.object as Stripe.Checkout.Session
    const coins = parseInt((s.metadata?.coins as string)||'0')
    const email = (s.metadata?.userEmail as string)||''
    if(coins>0 && email){
      const u = await db.user.upsert({ where:{ email }, update:{ coins: { increment: coins } }, create:{ email, coins } })
      await db.walletTx.create({ data:{ userId:u.id, amount: coins, type:'TOPUP', provider:'STRIPE', ref:s.id, note:'Stripe Checkout' } })
    }
  }
  return new Response('ok', { status:200 })
}
export const config = { api: { bodyParser: false } } as any

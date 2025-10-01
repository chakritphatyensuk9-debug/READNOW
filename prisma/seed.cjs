import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main(){
  const s = await prisma.series.create({ data:{ title:'Blade of Dawn', author:'Rin', genre:'action', rating:4.8, views:120000, coverUrl:'https://picsum.photos/seed/blade/600/800' } })
  for(let i=1;i<=6;i++){
    await prisma.chapter.create({ data:{ seriesId:s.id, index:i, title:`ตอนที่ ${i}`, price: i<=2?0:20, imageSeed:`${s.id}-${i}` } })
  }
  await prisma.user.upsert({ where:{ email:'admin@yourdomain.com' }, update:{ role:'ADMIN', coins: 1000 }, create:{ email:'admin@yourdomain.com', role:'ADMIN', coins: 1000 } })
  console.log('Seed done')
}
main().finally(()=> prisma.$disconnect())

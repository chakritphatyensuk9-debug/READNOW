import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
const hasS3 = !!process.env.S3_ACCESS_KEY_ID && !!process.env.S3_BUCKET
let client: S3Client | null = null
if(hasS3){
  client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! }
  })
}
export async function uploadPublic(key:string, buf:Buffer, contentType:string){
  if(!client) return null
  await client.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key, Body: buf, ACL:'public-read', ContentType: contentType }))
  const base = process.env.S3_PUBLIC_BASE || `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`
  return `${base}/${key}`
}

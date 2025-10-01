export async function GET(){
  const body = `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXTAUTH_URL || 'https://yourdomain.com'}/sitemap.xml`
  return new Response(body, { headers:{ 'Content-Type':'text/plain' } })
}

import { DOMAIN } from '~/shared/const'

export const loader = () => {
  // handle "GET" request
  // set up our text content that will be returned in the response
  //   const robotText = `
  //   User-agent: Applebot
  // Allow: /

  // User-agent: baiduspider
  // Allow: /

  // User-agent: Bingbot
  // Allow: /

  // User-agent: Facebot
  // Allow: /

  // User-agent: Googlebot
  // Allow: /

  // User-agent: msnbot
  // Allow: /

  // User-agent: Naverbot
  // Allow: /

  // User-agent: seznambot
  // Allow: /

  // User-agent: Slurp
  // Allow: /

  // User-agent: teoma
  // Allow: /

  // User-agent: Twitterbot
  // Allow: /

  // User-agent: Yeti
  // Allow: /

  // User-agent: *
  // Disallow: /

  // Sitemap: ${DOMAIN}/sitemap.xml`

  const robotText = `
User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`
  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

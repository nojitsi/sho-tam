import { getTradeAdsList } from '~/loaders/tradeAd'
import { DOMAIN } from '~/shared/const'

export const loader = async () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.
  const allPosts = await getTradeAdsList({
    select: {
      id: true,
      updatedAt: true,
    },
  })
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DOMAIN}</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${DOMAIN}/list</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>1.0</priority>
    </url>
    ${allPosts.map(
      item =>
        `<url>
        <loc>${DOMAIN}/list/${item.id}</loc>
        <lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>
        <priority>0.9</priority>
      </url>`,
    )}
    <url>
      <loc>${DOMAIN}/authors</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${DOMAIN}/contact</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${DOMAIN}/login</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${DOMAIN}/terms-and-conditions</loc>
      <lastmod>2022-01-08T00:15:16+01:00</lastmod>
      <priority>0.8</priority>
    </url>
    </urlset>
    `
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  })
}

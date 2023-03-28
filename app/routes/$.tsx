import { json, LoaderFunction } from '@remix-run/node'
import NotFound from '~/components/not-found'
import { getUserAuthData } from '~/service/auth'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserAuthData(request)
  throw json({ user }, 404)
}

export default function NotFoundPage() {
  return <NotFound />
}

import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import NotFound from '~/components/not-found'
import { getUserAuthData } from '~/service/auth'

export const meta: MetaFunction = () => {
  return {
    title: 'Сторінка не знайдена | zbroya.in.ua',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserAuthData(request)
  throw json({ user }, 404)
}

export default function NotFoundPage() {
  return <NotFound />
}

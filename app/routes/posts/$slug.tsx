import { useLoaderData, Link } from 'remix'
import type { LoaderFunction } from 'remix'
import { getPost, Post } from '~/loaders/post'

export const loader: LoaderFunction = async ({ params }) => {
	return getPost(params.slug as string)
}

export default function PostSlug() {
	const post: Post = useLoaderData()
	return (
		<main>
			<Link to={'/posts'}>Post list</Link>
			<h1>Some Post: {post.title}</h1>
			<p>{post.body}</p>
		</main>
	)
}
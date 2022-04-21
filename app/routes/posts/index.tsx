import { Link, useLoaderData } from 'remix'
import { getPosts } from '~/loaders/post'
import type { Post } from '~/loaders/post'

export const loader = async () => {
	return getPosts()
}

export default function Posts() {
	const posts = useLoaderData<Post[]>()

	return (
		<main>
			<Link to='/'>Home</Link>
			<h1>Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link to={post.slug}>{post.title}</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
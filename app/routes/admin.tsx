import { Link, Outlet, useLoaderData } from 'remix'

import { getPosts } from '~/loaders/post'
import type { Post } from '~/loaders/post'
import adminStyles from '~/styles/admin.css'

export const links = () => {
	return [{ rel: 'stylesheet', href: adminStyles }]
}

export const loader = async () => {
	return getPosts()
}

export default function Admin() {
	const posts = useLoaderData<Post[]>()
	return (
		<div className='admin'>
			<Link to='/'>Home</Link>
			<nav>
				<h1>Админка</h1>
				<ul>
					{posts.map((post) => (
						<li key={post.slug}>
							<Link to={`/admin/edit/${post.slug}`}>
								{post.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
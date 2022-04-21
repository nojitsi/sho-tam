import Store from 'jfs'
const postStorage = new Store('data/posts')

export type Post = {
  slug: string;
  title: string;
  body: string;
};

interface PostMap {
  [key: string]: Post;
}

export function getPosts() {
	let posts
	try {
		posts = Object.values(postStorage.allSync())
	}
	catch {
		posts = []
	}
	return Object.values(posts)
}

export function getPost(slug: string) {
	return postStorage.getSync(slug) || null
}

export async function createPost(post: Post) {
	postStorage.saveSync(post.slug, {
		title: post.title,
		body: post.body,
		slug: post.slug
	})
	return getPost(post.slug)
}

export async function deletePost(slug: string) {
	postStorage.deleteSync(slug)
}
import _ from 'lodash'
import invariant from 'tiny-invariant'
import { redirect, Form, ActionFunction, useActionData, useTransition, LoaderFunction, useLoaderData } from 'remix'

import { createPost, deletePost } from '~/loaders/post'
import { getPost, Post } from '~/loaders/post'

export const loader: LoaderFunction = async ({ params }) => {
	return getPost(params.slug as string)
}

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
	await new Promise((res) => setTimeout(res, 1000))

	const formData = await request.formData()

	const title = formData.get('title')
	const slug = formData.get('slug')
	const body = formData.get('body')
	const oldSlug = formData.get('oldSlug')

	const errors: PostError = {}

	if (!title) errors.title = true
	if (!slug) errors.slug = true
	if (!body) errors.markdown = true

	if (Object.keys(errors).length) {
		return errors
	}

	invariant(typeof title === 'string')
	invariant(typeof slug === 'string')
	invariant(typeof body === 'string')

	if(oldSlug && oldSlug !== slug) {
		invariant(typeof oldSlug === 'string')
		await deletePost(oldSlug)
	}
	await createPost({ title, slug, body })

	return redirect('/admin')
}

export default function UpdatePost() {
	const errors = useActionData()
	const transition = useTransition()
	const post: Post = useLoaderData()

	if(_.isEmpty(post)) {
		throw Error('Post with such slug do not exist.')
	}

	const oldSlug = post.slug

	return (
		<Form method='post'>
			<input type='text' name='oldSlug' defaultValue={oldSlug} hidden/>
			<p>
				<label>
          Post Title:{' '}
					{errors?.title ? (
						<em>Title is required</em>
					) : null}
					<input type='text' name='title' defaultValue={post.title} />
				</label>
			</p>
			<p>
				<label>
          Post Slug:{' '}
					{errors?.slug ? <em>Slug is required</em> : null}
					<input type='text' name='slug' defaultValue={post.slug}/>
				</label>
			</p>
			<p>
				<label htmlFor='body'>Body:</label>{' '}
				{errors?.markdown ? (
					<em>Body is required</em>
				) : null}
				<br />
				<textarea id='body' rows={20} name='body' defaultValue={post.body}/>
				{/* {post.body}
				</textarea> */}
			</p>
			<p>
				<button type='submit'>
					{
						transition.submission
							? 'Updating...'
							: 'Update Post'
					}
				</button>
			</p>
		</Form>
	)
}
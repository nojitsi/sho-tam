import invariant from 'tiny-invariant'
import { redirect, Form, ActionFunction, useActionData, useTransition } from 'remix'

import { createPost } from '~/loaders/post'

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

	const result = await createPost({ title, slug, body })

	console.log({result})
	return redirect('/admin')
}

export default function SignUp() {
	const errors = useActionData()
	const transition = useTransition()

	return (
		<Form method='post'>
			<p>
				<label>
          Post Title:{' '}
					{errors?.title ? (
						<em>Title is required</em>
					) : null}
					<input type='text' name='title' />
				</label>
			</p>
			<p>
				<label>
          Post Slug:{' '}
					{errors?.slug ? <em>Slug is required</em> : null}
					<input type='text' name='slug' />
				</label>
			</p>
			<p>
				<label htmlFor='body'>Body:</label>{' '}
				{errors?.markdown ? (
					<em>Body is required</em>
				) : null}
				<br />
				<textarea id='body' rows={20} name='body' />
			</p>
			<p>
				<button type='submit'>
					{
						transition.submission
							? 'Creating...'
							: 'Create Post'
					}
				</button>
			</p>
		</Form>
	)
}
import invariant from 'tiny-invariant'
import { redirect, Form, ActionFunction, useActionData, useTransition } from 'remix'

import { createTradeAd } from '~/loaders/tradeAd'

import transformToKebabCase from '~/helpers/transformToKebabCase'

type TradeAddCreationError = {
  title?: boolean;
	description?: boolean;
	price?: boolean;
	locationId?: boolean;
	url?: boolean;
	typeId?: boolean
	//author
	//goodTypeId
	//kit
	//images
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()

	const title = formData.get('title')
	const description = formData.get('description')
	const locationId = Number(formData.get('locationId'));
	const price = Number(formData.get('price'))
	const typeId = Number(formData.get('typeId'))

	const errors: TradeAddCreationError = {}

	if (!title) errors.title = true
	if (!description) errors.description = true
	if (!price) errors.price = true
	if (!locationId) errors.locationId = true
	if (!typeId) errors.typeId = true

	if (Object.keys(errors).length) {
		return errors
	}

	invariant(typeof title === 'string')
	invariant(typeof description === 'string')
	invariant(typeof price === 'number')
	invariant(typeof locationId === 'number')
	invariant(typeof typeId === 'number')

	const url = transformToKebabCase(title)
	const authorId = 1

	//goodTypeId
	//kit
	//images

	const result = await createTradeAd({ 
		title,
		description,
		price,
		locationId,
		url,
		authorId,

		goodTypeId: typeId
	})

	return redirect('/admin')
}

export default function NewPost() {
	const errors = useActionData()
	const transition = useTransition()

	return (
		<Form method='post'>
			<p>
				<label>
          Заголовок:{' '}
					{errors?.title ? (
						<em>Заголовок</em>
					) : null}
					<input type='text' name='title' />
				</label>
			</p>

			<p>
				<label htmlFor='body'>Опис:</label>{' '}
				{errors?.markdown ? (
					<em>Опис</em>
				) : null}
				<br />
				<textarea id='body' rows={20} name='body' />
			</p>

			<p>
				<label>
          Ціна:{' '}
					{errors?.title ? (
						<em>Ціна</em>
					) : null}
					<input type='number' name='price' />
				</label>
			</p>

			
			<input type='number' name='locationId' />
				

			<p>
				<button type='submit'>
					{
						transition.submission
							? 'Завантаження зброї...'
							: 'Додати в арсенал'
					}
				</button>
			</p>
		</Form>
	)
}
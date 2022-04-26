import invariant from 'tiny-invariant'
import type { ActionFunction} from 'remix'
import { unstable_createFileUploadHandler, unstable_parseMultipartFormData } from 'remix'
import { redirect, Form, useActionData, useTransition } from 'remix'

import { createTradeAd } from '~/loaders/tradeAd'

import transformToKebabCase from '~/helpers/transformToKebabCase'

type TradeAddCreationError = {
  title?: string;
	description?: string;
	price?: string;
	locationId?: string;
	url?: string;
	typeId?: string;
	kit?: string;
	images?: string;
};

export const action: ActionFunction = async ({ request }) => { 
	const outerImageFolderPath = '/images'
	const innerImageFolderPath = 'public' + outerImageFolderPath

	//maybee check content
	const uploadHandler = unstable_createFileUploadHandler({
		directory: innerImageFolderPath,
		maxFileSize: 10000000, //bytes
		file: ({ filename }) => filename,
	})

	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	)

	const title = formData.get('title')
	const description = formData.get('description')
	const locationId = Number(formData.get('locationId'))
	const price = Number(formData.get('price'))
	const typeId = Number(formData.get('typeId'))
	const kit = formData.getAll('kit').map(kitItem => {return {title: kitItem.toString()}})

	const images = formData.getAll('images').map((image: any) => {return {
		name: image.name,
		path: outerImageFolderPath + '/' + image.name,
	}})

	//validation
	const errors: TradeAddCreationError = {}

	if (!title) errors.title = 'err'
	if (!description) errors.description = 'err'
	if (!price) errors.price = 'err'
	if (!locationId) errors.locationId = 'err'
	if (!typeId) errors.typeId = 'err'

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

	//images

	const result = await createTradeAd({ 
		title,
		description,
		price,
		url,
		type: {
			connect: {
				id: typeId
			}
		},
		location: {
			connect: {
				id: locationId
			}
		},
		author: {
			connect: {
				id: authorId
			}
		},
		kit: {
			createMany: {
				data: kit,
				skipDuplicates: true
			}
		},
		image: {
			createMany: {
				data: images
			}
		}
	})

	return redirect('/admin')
}

export default function NewPost() {
	const errors = useActionData()
	const transition = useTransition()

	return (
		<Form method='post' encType='multipart/form-data'>
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
				<label htmlFor='description'>Опис:</label>{' '}
				{errors?.markdown ? (
					<em>Опис</em>
				) : null}
				<br />
				<textarea id='description' rows={20} name='description' />
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
			<input type='number' name='typeId' value={1} />
			<input type='file' name='images' multiple={true}/>
			
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
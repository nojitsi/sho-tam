import invariant from 'tiny-invariant'
import type {ActionFunction} from 'remix'
import {unstable_createFileUploadHandler, unstable_parseMultipartFormData} from 'remix'
import {redirect, Form, useActionData, useTransition} from 'remix'

import {createTradeAd} from '~/loaders/tradeAd'

import transformToKebabCase from '~/helpers/transformToKebabCase'
import { Autocomplete, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

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

export const action: ActionFunction = async ({request}) => {
	const outerImageFolderPath = '/images'
	const innerImageFolderPath = 'public' + outerImageFolderPath

	//maybee check content
	const uploadHandler = unstable_createFileUploadHandler({
		directory: innerImageFolderPath,
		maxFileSize: 10000000, //bytes
		file: ({filename}) => filename,
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
	const kit = formData.getAll('kit').map(kitItem => {
		return {title: kitItem.toString()}
	})

	const images = formData.getAll('images').map((image: any) => {
		return {
			name: image.name,
			path: outerImageFolderPath + '/' + image.name,
		}
	})

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
		contact: 'Random Number',
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

	return redirect('/', {
		statusText: 'Success ad'
	})
}

export default function NewPost() {
	const errors = useActionData()
	const transition = useTransition()

	return (
		<Container component='main' sx={{ mt: 2, mb: 2, backgroundColor: 'common.white' }} maxWidth='sm'>

		<Form method="post" encType="multipart/form-data">
			<p>
				<label>
					Заголовок:{' '}
					{errors?.title ? (
						<em>Заголовок</em>
					) : null}
				</label>
				<input type="text" name="title"/>
			</p>

			<p>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">срака</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						
						label="срака"
						//onChange={(handleChange)}
					>
						<MenuItem value={10}>пістоль</MenuItem>
						<MenuItem value={20}>дробаш</MenuItem>
						<MenuItem value={30}>кулемет бляха</MenuItem>
					</Select>
				</FormControl>
				<input type="number" name="typeId" value={1} hidden/>
			</p>

			<p>
				<label htmlFor="description">Опис:</label>{' '}
				{errors?.markdown ? (
					<em>Опис</em>
				) : null}
				<br/>
				<textarea id="description" rows={20} name="description"/>
			</p>

			<p>
				<label>
					Ціна:{' '}
					{errors?.title ? (
						<em>Ціна</em>
					) : null}
					<input type="number" name="price"/>
				</label>
			</p>

			<p>
				<label>
					{errors?.title ? (
						<em>Локація</em>
					) : null}
				</label>
				<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={['r', 'b', 'c']}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Локація" />}
					/>
					<input type="number" name="locationId"/>
			</p>

			<input type="file" name="images" accept="image/png, image/webp, image/jpeg" multiple={true}/>

			<p>
				<button type="submit">
					{
						transition.submission
							? 'Завантаження зброї...'
							: 'Додати в арсенал'
					}
				</button>
			</p>
		</Form>

		</Container>
	)
}

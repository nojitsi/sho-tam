import invariant from 'tiny-invariant'

import { createTradeAd } from '~/loaders/tradeAd'

import transformToKebabCase from '~/helpers/transformToKebabCase'
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import {
  ActionFunction,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
  redirect,
  LoaderFunction,
  unstable_createMemoryUploadHandler,
  unstable_composeUploadHandlers,
} from '@remix-run/node'
import {
  useActionData,
  useTransition,
  Form,
  useLoaderData,
} from '@remix-run/react'
import { getGoodTypes } from '~/loaders/goodTypes'
import { getLocationTreeData, ROOT_LOCATION_ID } from '~/loaders/locations'
import { GoodTypes } from '@prisma/client'
import { authenticator } from '~/service/auth'
import {
  LocationSelect,
  locationSelectLinks,
} from '~/src/components/location-select'
import React from 'react'
import { getFormMocks } from '~/loaders/mocks'

const outerImageFolderPath = '/images'
const innerImageFolderPath = 'public' + outerImageFolderPath

type TradeAddCreationError = {
  title?: string
  description?: string
  price?: string
  locationId?: string
  locationPath?: string
  url?: string
  typeId?: string
  kit?: string
  images?: string
}

export const links = () => [...locationSelectLinks()]

export const action: ActionFunction = async ({ request }: any) => {
  //maybee check content
  // const formData = await request.formData()

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: innerImageFolderPath,
      maxPartSize: 10000000, //bytes
      file: ({ filename }: any) => filename,
    }),
    unstable_createMemoryUploadHandler(),
  )

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const title = await formData.get('title')
  const description = await formData.get('description')
  const locationId = Number(formData.get('locationId'))
  const locationPath = await formData.get('locationPath')
  const price = Number(formData.get('price'))
  const typeId = Number(formData.get('typeId'))
  const kit = formData.getAll('kit').map((kitItem: any) => {
    return { title: kitItem.toString() }
  })

  const images = formData.getAll('images').map((image: any) => {
    return {
      name: image.name,
      path: outerImageFolderPath + '/' + image.name,
    }
  })

  //validation
  const errors: TradeAddCreationError = {}

  if (!title) errors.title = 'Provide title'
  if (!description) errors.description = 'Provide description'
  if (!price) errors.price = 'Provide prive'
  if (!locationId) errors.locationId = 'Provide location id'
  if (!locationPath) errors.locationPath = 'Provide location path'
  if (!typeId) errors.typeId = 'Provide weapon type type'

  if (Object.keys(errors).length) {
    return errors
  }

  invariant(typeof title === 'string')
  invariant(typeof description === 'string')
  invariant(typeof price === 'number')
  invariant(typeof locationId === 'number')
  invariant(typeof locationPath === 'string')
  invariant(typeof typeId === 'number')

  const authorId = 1

  //images

  const result = await createTradeAd({
    title,
    description,
    price,
    contact: 'Random Number',
    type: {
      connect: {
        id: typeId,
      },
    },
    location: {
      connect: {
        id: locationId,
      },
    },
    author: {
      connect: {
        id: authorId,
      },
    },
    kit: {
      createMany: {
        data: kit,
        skipDuplicates: true,
      },
    },
    image: {
      createMany: {
        data: images,
      },
    },
    locationPath,
  })

  return redirect('/', {
    statusText: 'Success ad',
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const goodTypes = await getGoodTypes()
  const locationTreeData = await getLocationTreeData(ROOT_LOCATION_ID)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })
  const mocks = getFormMocks()

  return {
    goodTypes,
    locationTreeData,
    mocks,
  }
}

const currencies = ['₴', '$', '€', '฿']

export default function NewPost() {
  const transition = useTransition()
  const errors = useActionData() ?? { category: '' }
  const { goodTypes, locationTreeData, mocks } = useLoaderData()

  const [price, setPrice] = React.useState<string>(mocks?.price ?? '')

  return (
    <Container
      component="main"
      sx={{ mt: 2, mb: 2, backgroundColor: 'common.white', padding: 3 }}
      maxWidth="sm"
    >
      <Form
        method="post"
        encType="multipart/form-data"
        autoComplete="off"
        autoSave="on"
      >
        <TextField
          id="title-input"
          label="Заголовок"
          variant="filled"
          name="title"
          inputProps={{ maxLength: 50 }}
          error={errors?.title}
          helperText={errors?.title}
          required
          fullWidth
          defaultValue={mocks?.title}
        />
        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.category}>
          <InputLabel id="category-label">Категорія *</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            label="Категорія *"
            name="typeId"
            required
            //onChange={(handleChange)}
            // ...(mocks?.typeId)
            defaultValue={mocks?.typeId}
          >
            {goodTypes.map((goodType: GoodTypes) => (
              <MenuItem
                value={goodType.id}
                style={{
                  lineHeight: '32px',
                  fontSize: '24px',
                }}
                key={goodType.id}
              >
                <Icon
                  sx={{ mr: 2 }}
                  style={{
                    height: '32px',
                    width: '32px',
                  }}
                >
                  <img src={goodType.imageUrl} height={32} width={32} />
                </Icon>
                {goodType.name}
              </MenuItem>
            ))}
          </Select>
          {errors?.category ? (
            <FormHelperText>{errors?.category}</FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        <TextField
          id="description-input"
          label="Опис"
          variant="outlined"
          name="description"
          inputProps={{ maxLength: 500 }}
          error={errors?.description}
          helperText={errors?.description}
          margin="normal"
          rows={3}
          multiline
          required
          fullWidth
          defaultValue={mocks?.description}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            name="price"
            label="Ціна"
            sx={{ width: '80%' }}
            onChange={e => {
              const regex = /^[0-9\b]+$/
              if (e.target.value === '' || regex.test(e.target.value)) {
                setPrice(e.target.value)
              }
            }}
            value={price}
            required
          />
          <TextField
            id="currency-input"
            name="currency"
            variant="filled"
            defaultValue={currencies[0]}
            sx={{
              width: '18%',
              '& .MuiInputBase-input': {
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '3.4rem',
                height: '100%',
                fontSize: '20px',
                padding: 0,
              },
            }}
            select
          >
            {currencies.map(currency => (
              <MenuItem
                key={currency}
                value={currency}
                sx={{
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.location}>
          <LocationSelect locationTreeData={locationTreeData} mocks={mocks} />
        </FormControl>

        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.images}>
          <input
            type="file"
            name="images"
            accept="image/png, image/webp, image/jpeg"
            multiple={true}
          />{' '}
        </FormControl>

        <p>
          <button type="submit">
            {transition.submission
              ? 'Завантаження зброї...'
              : 'Додати в арсенал'}
          </button>
        </p>
      </Form>
    </Container>
  )
}

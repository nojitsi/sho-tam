import invariant from 'tiny-invariant'

import { createTradeAd } from '~/loaders/tradeAd'

import transformToKebabCase from '~/helpers/transformToKebabCase'
import {
  Autocomplete,
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
} from '@remix-run/node'
import { useActionData, useTransition, Form, useLoaderData } from '@remix-run/react'
import { getGoodTypes } from '~/loaders/goodTypes'
import { getLocationTree, LocationLeaf } from '~/loaders/locations'
import { GoodTypes } from '@prisma/client'
import { authenticator } from '~/service/auth'
import { LocationSelect } from '~/src/components/location-select'
import TreeSelect from 'mui-tree-select'

const outerImageFolderPath = '/images'
const innerImageFolderPath = 'public' + outerImageFolderPath

type TradeAddCreationError = {
  title?: string
  description?: string
  price?: string
  locationId?: string
  url?: string
  typeId?: string
  kit?: string
  images?: string
}

export const action: ActionFunction = async ({ request }: any) => {
  //maybee check content
  const uploadHandler = unstable_createFileUploadHandler({
    directory: innerImageFolderPath,
    maxPartSize: 10000000, //bytes
    file: ({ filename }: any) => filename,
  })

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const title = formData.get('title')
  const description = formData.get('description')
  const locationId = Number(formData.get('locationId'))
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
  })

  return redirect('/', {
    statusText: 'Success ad',
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const goodTypes = await getGoodTypes()
  const locationTree = await getLocationTree()
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })

  return {
    goodTypes,
    locationTree,
  }
}

const currencies = ['₴', '$', '€', '฿']

export default function NewPost() {
  const transition = useTransition()
  const errors = useActionData() ?? { category: '' }
  const { goodTypes, locationTree } = useLoaderData()
  return (
    <Container
      component="main"
      sx={{ mt: 2, mb: 2, backgroundColor: 'common.white', padding: 3 }}
      maxWidth="sm"
    >
      <Form method="post" encType="multipart/form-data" autoComplete="off" autoSave="on">
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
          {errors?.category ? <FormHelperText>{errors?.category}</FormHelperText> : ''}
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
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <TextField name="price" label="Ціна" type={'number'} sx={{ width: '80%' }} required />
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
          <TreeSelect
            getChildren={(node: any) => (node ? node.children : locationTree)}
            getParent={(node: any) => node}
            renderInput={(params: any) => <TextField {...params} />}
          />
          {/* <LocationSelect locationTree={locationTree} /> */}
        </FormControl>

        <input
          type="file"
          name="images"
          accept="image/png, image/webp, image/jpeg"
          multiple={true}
        />

        <p>
          <button type="submit">
            {transition.submission ? 'Завантаження зброї...' : 'Додати в арсенал'}
          </button>
        </p>
      </Form>
    </Container>
  )
}

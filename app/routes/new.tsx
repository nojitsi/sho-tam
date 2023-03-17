import invariant from 'tiny-invariant'

import { createTradeAd } from '~/loaders/tradeAd'

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
  Link,
} from '@remix-run/react'
import { getGoodTypes } from '~/loaders/goodTypes'
import { getLocationTreeData, ROOT_LOCATION_ID } from '~/loaders/locations'
import { GoodTypes, User } from '@prisma/client'
import { authenticator } from '~/service/auth'
import {
  LocationSelect,
  locationSelectLinks,
} from '~/src/components/location-select'
import React from 'react'
import { getFormMocks } from '~/loaders/mocks'
import { FileInput, fileInputLinks } from '~/src/components/file-input'
import crypto from 'crypto'
import { KitInput } from '~/src/components/kit-input'

const TEN_MB_IN_B = 10000000
const MAX_NUMBER_OF_IMAGES = 10

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
  contact?: string
  terms?: string
}

export const links = () => [...locationSelectLinks(), ...fileInputLinks()]

export const removeImageFolder = async (folderIdentifier: string) => {
  const { exec } = require('child_process')
  exec(`rm -R ${innerImageFolderPath}/${folderIdentifier}`)
}

export const action: ActionFunction = async ({ request }: any) => {
  //maybee check content
  // const formData = await request.formData()

  const user: User = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })) as User

  const imageFolderUniqueIdentifier = crypto.randomUUID()
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      directory: `${innerImageFolderPath}/${imageFolderUniqueIdentifier}`,
      maxPartSize: TEN_MB_IN_B,
      file: () => crypto.randomUUID(),
    }),
    unstable_createMemoryUploadHandler(),
  )

  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler,
    )

    const title = formData.get('title')
    const description = formData.get('description')
    const locationId = Number(formData.get('locationId'))
    const locationPath = formData.get('locationPath')
    const price = Number(formData.get('price'))
    const currency = formData.get('currency')
    const typeId = Number(formData.get('typeId'))
    const kit = formData
      .getAll('kit[]')
      .filter(item => !!item)
      .map(item => item.toString())
    const contact = formData.get('contact')
    const terms = formData.get('terms')
    const images = formData
      .getAll('images')
      .filter((image: any) => !!image.name)
      .map((image: any) => {
        return {
          name: image.name,
          path: `${outerImageFolderPath}/${imageFolderUniqueIdentifier}/${image.name}`,
        }
      })

    //validation
    const errors: TradeAddCreationError = {}

    if (images.length > MAX_NUMBER_OF_IMAGES) {
      removeImageFolder(imageFolderUniqueIdentifier)
      errors.images =
        'Кількість файлів не може бути більшою за ' + MAX_NUMBER_OF_IMAGES
    }

    if (!images.length) {
      removeImageFolder(imageFolderUniqueIdentifier)
      errors.images = 'Ви повинні додати хочаб один файл'
    }

    if (!title) errors.title = 'Provide title'
    if (!description) errors.description = 'Provide description'
    if (!price) errors.price = 'Provide prive'
    if (!locationId) errors.locationId = 'Provide location id'
    if (!locationPath) errors.locationPath = 'Provide location path'
    if (!typeId) errors.typeId = 'Provide weapon type'
    if (!contact) errors.contact = 'Provide contact'
    if (!terms || terms === 'off')
      errors.terms = 'Вам треба погодитись з умовами користування'

    if (Object.keys(errors).length) {
      return errors
    }

    invariant(typeof title === 'string')
    invariant(typeof description === 'string')
    invariant(typeof price === 'number')
    invariant(typeof locationId === 'number')
    invariant(typeof locationPath === 'string')
    invariant(typeof typeId === 'number')
    invariant(typeof contact === 'string')

    const result = await createTradeAd({
      title,
      description,
      price: `${currency}${price}`,
      contact,
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
          id: user.id,
        },
      },
      kit: {
        set: kit,
      },
      images: {
        createMany: {
          data: images,
        },
      },
      locationPath,
    })

    return redirect('/', {
      statusText: 'Success ad',
    })
  } catch (ignored: unknown) {
    console.log({ ignored: JSON.stringify(ignored) })
    removeImageFolder(imageFolderUniqueIdentifier)
    return {
      images: 'Зображення не може перевищувати обʼєм в 10Мб',
    }
  }
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
  const errors = useActionData()

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
            defaultValue={mocks?.typeId}
            style={{
              fontSize: '24px',
              verticalAlign: 'super',
            }}
          >
            {goodTypes.map((goodType: GoodTypes) => (
              <MenuItem
                value={goodType.id}
                style={{
                  fontSize: '24px',
                }}
                key={goodType.id}
              >
                <img
                  src={goodType.imageUrl}
                  style={{
                    verticalAlign: 'middle',
                  }}
                  height={32}
                  width={32}
                />
                <Box sx={{ ml: 2, display: 'inline', verticalAlign: 'middle' }}>
                  {goodType.name}
                </Box>
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
        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.kit}>
          <KitInput mocks={mocks} />
        </FormControl>
        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.images}>
          <FileInput />
          {errors?.images ? (
            <FormHelperText>{errors?.images}</FormHelperText>
          ) : (
            ''
          )}
        </FormControl>
        <FormControl sx={{ mt: 2 }} fullWidth error={!!errors?.location}>
          <LocationSelect locationTreeData={locationTreeData} mocks={mocks} />
        </FormControl>
        <TextField
          label="Контакт"
          variant="filled"
          name="contact"
          inputProps={{ maxLength: 50 }}
          sx={{ mt: 2 }}
          error={errors?.contact}
          helperText={errors?.contact}
          required
          fullWidth
          defaultValue={mocks?.contact}
        />

        <FormControl
          sx={{ mt: 2, alignContent: 'start' }}
          error={!!errors?.terms}
          fullWidth
        >
          <FormControlLabel
            label={
              <div>
                <span>Натискаючи це ви погоджуєтесь з </span>
                <Link to={'/terms-conditions'} target="_blank">
                  умовами користування
                </Link>
              </div>
            }
            control={
              <Checkbox
                name="terms"
                defaultChecked={mocks.terms ?? false}
                color="success"
                required
              />
            }
          />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: '#b5303096',
            mt: 2,
          }}
          fullWidth
        >
          {transition.submission
            ? 'Завантаження зброї...'
            : 'Завантажити в арсенал'}
        </Button>
      </Form>
    </Container>
  )
}

import { LocationLeaf } from '~/loaders/locations'
import { Location } from '@prisma/client'
import { Autocomplete, Box, TextField } from '@mui/material'

export function LocationSelect(props: { locationTree: LocationLeaf[] }) {
  if (!props.locationTree) throw Error('Location tree is not provided')

  let selectedId = undefined

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="location-select"
        options={getLocationListOptions(props.locationTree)}
        groupBy={option => String(option.parentId)}
        getOptionLabel={option => option.label}
        renderInput={params => (
          <TextField {...params} name="locationCode" label="Місцезнаходження" fullWidth />
        )}
        onChange={(event, value) => {
          if (value) {
            ;(document.getElementById('locationPathInput') as HTMLInputElement).setAttribute(
              'value',
              value.path,
            )
            ;(document.getElementById('locationIdInput') as HTMLInputElement).setAttribute(
              'value',
              value.id.toString(),
            )
          }

          return value
        }}
        inputValue={selectedId}
        // renderGroup={params => {
        //   console.log(params)
        //   return <TextField {...params} fullWidth />
        // }}
        autoHighlight
        blurOnSelect
        fullWidth
        aria-required
      />
      <input id="locationPathInput" type="number" name="locationPath" hidden={true} />
      <input id="locationIdInput" type="number" name="locationId" hidden={true} />
    </Box>
  )
}

type LocationOption = {
  id: number
  label: string
  parentId: number | null
  parent?: Location
  path: string
}

const getLocationListOptions = (
  locationLevel: LocationLeaf[],
  level?: number,
  parent?: Location,
): LocationOption[] => {
  level = level ?? 0
  const levelIntend = ' '.repeat(level)
  const locationGroups: LocationOption[][] = []

  locationLevel.map(locationLeaf => {
    locationGroups.push([
      {
        id: locationLeaf.data.id,
        label: levelIntend + locationLeaf.data.name,
        parentId: locationLeaf.data.parentId,
        parent,
        path: locationLeaf.data.path,
      },
    ])
    locationGroups.push(
      getLocationListOptions(locationLeaf.children, (level as number) + 1, locationLeaf.data),
    )
  })

  return locationGroups.flat()
}

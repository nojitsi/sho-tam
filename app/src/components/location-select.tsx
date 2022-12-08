import {
  LocationsTreeBuilder,
  LocationsTreeData,
  ROOT_LOCATION_ID,
} from '~/loaders/locations'
import { Location } from '@prisma/client'
import { TextField } from '@mui/material'
import TreeSelect from 'mui-tree-select-common-js'

export function LocationSelect({
  locationTreeData,
}: {
  locationTreeData: LocationsTreeData
}) {
  if (!locationTreeData) throw Error('Location tree is not provided')

  const locationTreeBuilder = new LocationsTreeBuilder(locationTreeData)

  return (
    <TreeSelect
      getChildren={(node: any) => {
        if (!node)
          return locationTreeBuilder.getLocationTreeNodes([ROOT_LOCATION_ID])

        if (node.childIds && node.childIds.length !== 0)
          return locationTreeBuilder.getLocationTreeNodes(node.childIds)

        return node.children
      }}
      getParent={(node: any) => {
        console.log({ node })
        node.value.parentId
          ? locationTreeBuilder.getLocationTreeNode(node.value.parentId)
          : null
      }}
      renderInput={(params: any) => {
        // console.log({ ...params })
        return <TextField {...params} />
      }}
    />
  )
}

import { Prisma, Location } from '@prisma/client'
import { prisma } from 'database/prisma.server'

export const ROOT_LOCATION_ID = 0

type LocationHashMap = Record<number, Location>

let locationTreeData: LocationsTreeData

export type LocationsTreeData = {
  locationHashMap: LocationHashMap
  // parentToChildIdsHashMap: LocationChildIdHashMap,
  locationTree: any[]
}

export const getLocationTreeData = async (
  locationParentId?: number,
): Promise<LocationsTreeData> => {
  if (!locationTreeData) {
    const locations = await getAllLocations()
    const locationHashMap = transformLocationListToHashMap(locations)
    // const parentToChildIdsHashMap = transformLocationListToParentIdChildIdsHashMap(locations)

    const locationTree = await getLocationTree(locationParentId)

    locationTreeData = {
      locationHashMap,
      // parentToChildIdsHashMap,
      locationTree,
    }
  }

  return locationTreeData
}

const transformLocationListToHashMap = (
  baseLocationsList: Location[],
): LocationHashMap => {
  const locationHashMap: Record<number, Location> = {}
  for (const location of baseLocationsList) {
    locationHashMap[location.id] = location
  }
  return locationHashMap
}

export type LocationLeaf = {
  value: number
  name: string
  children: LocationLeaf[]
}

const ROOT_LOCATION_PARENT_ID = null

export const getLocationTree = async (
  parentId?: number,
): Promise<LocationLeaf[]> => {
  const locationLevel = await getLocationLevelList(
    parentId ?? ROOT_LOCATION_PARENT_ID,
  )
  return Promise.all(
    locationLevel.map(async locationData => ({
      value: locationData.id,
      name: locationData.name,
      children: await getLocationTree(locationData.id),
    })),
  )
}

export const getLocationLevelList = async (
  parentId: number | null,
): Promise<Location[]> => {
  return prisma.location.findMany({
    where: {
      parentId,
    },
  })
}

export const getAllLocations = () => {
  return prisma.location.findMany()
}

export async function createLocation(location: Prisma.LocationCreateInput) {
  //добавить создание связей
  return prisma.location.create({
    data: location,
  })
}

export async function deleteTradeAd(id: number) {
  return prisma.location.delete({
    where: {
      id,
    },
  })
}


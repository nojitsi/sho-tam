import { Prisma, Location } from '@prisma/client'
import { prisma } from 'database/prisma.server'

const ROOT_LOCATION_PARENT_ID = null

export type LocationLeaf = {
	data: Location,
	children: LocationLeaf[]
}

export const getLocationTree = async (parentId?: number): Promise<LocationLeaf[]> => {
	const locationLevel = await getLocationLevelList(parentId ?? ROOT_LOCATION_PARENT_ID);
	return Promise.all(locationLevel.map(async (locationData) => ({
		data: locationData,
		children: await getLocationTree(locationData.id)
	})))
}

export const getLocationLevelList = async (parentId: number | null): Promise<Location[]> => {
	return prisma.location.findMany({
		where: {
			parentId
		}
	})
}

export async function createLocation(location: Prisma.LocationCreateInput)
{
	//добавить создание связей
	return prisma.location.create({
		data: location
	})
}


export async function deleteTradeAd(id: number) {
	return prisma.location.delete({
		where: {
			id
		}
	})
}
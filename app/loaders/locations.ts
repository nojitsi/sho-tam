import { prisma } from '~/database/prisma'
import { Location, Prisma } from '@prisma/client'

const PARENT_LOCATION_ID = 0

export const getLocationTreeParents = async (): Promise<Location[]> => {
	return await prisma.location.findMany({
		where: {
			parentId: PARENT_LOCATION_ID
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
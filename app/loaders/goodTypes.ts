import { prisma } from '~/database/prisma'
import { GoodTypes, Prisma } from '@prisma/client'

export const getGoodTypes = async (): Promise<GoodTypes[]> => {
	return await prisma.goodTypes.findMany({})
}

export async function createGoodType(ad: Prisma.GoodTypesCreateInput)
{
	return prisma.goodTypes.create({
		data: ad
	})
}


export async function deleteGoodType(id: number) {
	return prisma.goodTypes.delete({
		where: {
			id
		}
	})
}
import { prisma } from 'database/prisma.server'
import type { GoodTypes, Prisma } from '@prisma/client'

export const getGoodTypes = (): Promise<GoodTypes[]> => {
  return prisma.goodTypes.findMany({})
}

export const getGoodTypesImagePathMap = async (): Promise<
  Record<number, string>
> => {
  const result: Record<number, string> = {}
  const goodTypes = await getGoodTypes()
  goodTypes.map(item => (result[item.id] = item.imageUrl))
  return result
}

export const createGoodType = (ad: Prisma.GoodTypesCreateInput) => {
  return prisma.goodTypes.create({
    data: ad,
  })
}

export const deleteGoodType = (id: number) => {
  return prisma.goodTypes.delete({
    where: {
      id,
    },
  })
}


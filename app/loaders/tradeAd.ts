import { prisma } from 'database/prisma.server'
import type { TradeAd, Prisma, TradeAdImage, GoodTypes } from '@prisma/client'
interface TradeAdMap {
  [key: string]: TradeAd
}

export const getTradeAdsList = async (
  args: Prisma.TradeAdFindManyArgs,
): Promise<TradeAd[]> => {
  return prisma.tradeAd.findMany(args)
}

export const getTradeAdById = async (id: number): Promise<TradeAd & {images: TradeAdImage[], type: GoodTypes} | null> => {
  return prisma.tradeAd.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      type: true,
    },
  })
}

export const upadteTradeAd = (where: Prisma.TradeAdWhereUniqueInput, data: Prisma.TradeAdUpdateInput) => {
  return prisma.tradeAd.update({where, data})
}

export async function createTradeAd(ad: Prisma.TradeAdCreateInput) {
  return prisma.tradeAd.create({
    data: ad,
  })
}

export async function deleteTradeAd(id: number) {
  return prisma.tradeAd.delete({
    where: {
      id,
    },
  })
}


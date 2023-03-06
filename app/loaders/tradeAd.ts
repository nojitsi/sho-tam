import { prisma } from 'database/prisma.server'
import type { TradeAd, Prisma } from '@prisma/client'
interface TradeAdMap {
  [key: string]: TradeAd;
}

export const getTradeAdsList = async (args: Prisma.TradeAdFindManyArgs): Promise<TradeAd[]> => {
	return prisma.tradeAd.findMany(args)
}

export const getTradeAdById = async (id: number): Promise<TradeAd | null> => {
	return prisma.tradeAd.findUnique({
		where: {
			id,
		},
	})
}

export async function createTradeAd(ad: Prisma.TradeAdCreateInput)
{
	//добавить создание связей
	return prisma.tradeAd.create({
		data: ad
	})
}


export async function deleteTradeAd(id: number) {
	return prisma.tradeAd.delete({
		where: {
			id
		}
	})
}
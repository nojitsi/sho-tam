import { prisma } from 'database/prisma'
import type { TradeAd, Prisma } from '@prisma/client'

interface TradeAdMap {
  [key: string]: TradeAd;
}

export const getTradeAdsList = async (args: Prisma.TradeAdFindManyArgs): Promise<TradeAd[]> => {
	return await prisma.tradeAd.findMany(args)
}

export const getTradeAdById = async (id: number): Promise<TradeAd | null> => {
	return await prisma.tradeAd.findUnique({
		where: {
			id,
		},
	})
}

export const getTradeAdByUrl = async (url: string): Promise<TradeAd | null> => {
	return await prisma.tradeAd.findUnique({
		where: {
			url,
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
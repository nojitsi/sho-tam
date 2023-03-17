import { prisma } from 'database/prisma.server'
import type { User, Prisma } from '@prisma/client'

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function createUser(user: Prisma.UserCreateInput) {
  //добавить создание связей
  return prisma.user.create({
    data: user,
  })
}

export const findOrCreateUser = async (
  where: Prisma.UserWhereUniqueInput,
  create: Prisma.UserCreateInput,
) => {
  return prisma.user.upsert({
    where,
    create,
    update: {},
  })
}

export async function updateUser(id: number, user: Prisma.UserUpdateInput) {
  return prisma.user.update({
    data: user,
    where: {
      id,
    },
  })
}

export async function deleteTradeAd(id: number) {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}


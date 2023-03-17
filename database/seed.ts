import { PrismaClient, UserRole } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  await Promise.all([setupCities(), setupUsers(), setupAdTypes()])
}

const setupCities = async () => {
  const countryPath = '0'
  const ukraineLocation = await prisma.location.create({
    data: {
      id: 0,
      name: 'Україна',
      path: countryPath,
    },
  })

  const locationsRawData = fs.readFileSync('data/cities/ua.json')
  const locationsData = JSON.parse(locationsRawData.toString())
  const regions = locationsData.regions

  for (const regionData of regions) {
    let region = await prisma.location.create({
      data: {
        name: regionData.name,
        parent: { connect: { id: ukraineLocation.id } },
        path: '',
      },
    })
    const regionPath = countryPath + ', ' + region.id
    region = await prisma.location.update({
      where: {
        id: region.id,
      },
      data: {
        path: regionPath,
      },
    })

    for (const cityData of regionData.cities) {
      let city = await prisma.location.create({
        data: {
          name: cityData.name,
          parent: { connect: { id: region.id } },
          path: '',
        },
      })
      const cityPath = regionPath + ', ' + city.id
      city = await prisma.location.update({
        where: {
          id: city.id,
        },
        data: {
          path: cityPath,
        },
      })
    }
  }
}

const setupUsers = async () => {
  const admin = await prisma.user.create({
    data: {
      name: 'Злюка адмін',
      email: 'admin@gmail.com',
      emailVerified: true,
      role: UserRole.ADMIN,
    },
  })
}

const setupAdTypes = async () => {
  const adTypes = await prisma.goodTypes.createMany({
    data: [
      {
        name: 'Рушниця',
        imageUrl: '/img/icons/weapons/rifle-ammo.webp',
      },
      {
        name: 'Карабін',
        imageUrl: '/img/icons/weapons/carabin-ammo.webp',
      },
      {
        name: 'Пістолет',
        imageUrl: '/img/icons/weapons/pistol-ammo.webp',
      },
    ],
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

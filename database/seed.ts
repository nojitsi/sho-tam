import { PrismaClient, UserRole } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	await Promise.all([setupCities(), setupUsers(), setupAdTypes()])
}

const setupCities = async () => {
	const ukraineLocation = await prisma.location.create({
		data: {
			id: 0,
			name: 'Україна',
		},
	})
	
	const locationsRawData = fs.readFileSync('data/cities/ua.json')
	const locationsData = JSON.parse(locationsRawData.toString())
	const regions = locationsData.regions

	for (const regionData of regions) {
		const region = await prisma.location.create({
			data: {
				name: regionData.name,
				parent: { connect: { id: ukraineLocation.id } },
			},
		})

		for (const cityData of regionData.cities) {
			await prisma.location.create({
				data: {
					name: cityData.name,
					parent: { connect: { id: region.id } },
				},
			})
		}
	}
}

const setupUsers = async () => {
	const admin = await prisma.user.create({
		data: {
			name: 'Злюка адмін',
			phone: '123456789',
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
				name: 'Дробаш',
				imageUrl: '/img/weapons/icons/shotgun.png',
			},
			{
				name: 'Карабін',
				imageUrl: '/img/weapons/icons/carabin.png',
			},
			{
				name: 'Пістолет',
				imageUrl: '/img/weapons/icons/hand-gun.png',
			},
		],
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

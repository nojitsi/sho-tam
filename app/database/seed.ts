import { PrismaClient, UserRole } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
	const ukraineLocation = await prisma.location.create({
		data: {
			id: 0,
			name: 'Вся Україна',
			parentId: 0
		}
	})
	const testLocation = await prisma.location.create({
		data: {
			name: 'Тестова локація',
			parentId: 0
		}
	})
	const admin = await prisma.user.create({
		data: {
			name: 'Злюка адмін',
			phone: '123456789',
			email: 'admin@gmail.com',
			emailVerified: true,
			docsVerified: true,
			role: UserRole.ADMIN,
		}
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
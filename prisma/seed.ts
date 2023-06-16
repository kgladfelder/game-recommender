import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			email: "change@me.org",
			password: await bcrypt.hash("password", 10),
			admin: true,
		},
	});

	const nintendo = await prisma.company.upsert({
		where: { name: "Nintendo" },
		update: {},
		create: {
			name: "Nintendo",
			systems: {
				create: {
					name: "Switch",
				},
			},
		},
	});

	const microsoft = await prisma.company.upsert({
		where: { name: "Microsoft" },
		update: {},
		create: {
			name: "Microsoft",
			systems: {
				create: {
					name: "Xbox Series X|S",
				},
			},
		},
	});

	const sony = await prisma.company.upsert({
		where: { name: "Sony" },
		update: {},
		create: {
			name: "Sony",
			systems: {
				create: {
					name: "PS5",
				},
			},
		},
	});

	const valve = await prisma.company.upsert({
		where: { name: "Valve" },
		update: {},
		create: {
			name: "Valve",
			systems: {
				create: {
					name: "Steam",
				},
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

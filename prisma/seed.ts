import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import microsoftJson from "./data/microsoft.json" assert { type: "json" };
import nintendoJson from "./data/nintendo.json" assert { type: "json" };
import sonyJson from "./data/sony.json" assert { type: "json" };
import pcJson from "./data/pc.json" assert { type: "json" };
import publisherJson from "./data/publisher.json" assert { type: "json" };
import developerJson from "./data/developer.json" assert { type: "json" };
import genreJson from "./data/genre.json" assert { type: "json" };

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
		where: { name: nintendoJson.name },
		update: {},
		create: {
			name: nintendoJson.name,
			foundingDate: new Date(nintendoJson.foundingDate),
		},
	});

	for (const system of nintendoJson.systems) {
		await prisma.system.upsert({
			where: { name: system.name },
			update: {
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: system.euReleaseDate ? new Date(system.euReleaseDate) : undefined,
			},
			create: {
				name: system.name,
				companyId: nintendo.id,
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: system.euReleaseDate ? new Date(system.euReleaseDate) : undefined,
			},
		});
	}

	const sony = await prisma.company.upsert({
		where: { name: sonyJson.name },
		update: {},
		create: {
			name: sonyJson.name,
			foundingDate: new Date(sonyJson.foundingDate),
		},
	});

	for (const system of sonyJson.systems) {
		await prisma.system.upsert({
			where: { name: system.name },
			update: {
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
			create: {
				name: system.name,
				companyId: sony.id,
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
		});
	}

	const microsoft = await prisma.company.upsert({
		where: { name: microsoftJson.name },
		update: {},
		create: {
			name: microsoftJson.name,
			foundingDate: new Date(microsoftJson.foundingDate),
		},
	});

	for (const system of microsoftJson.systems) {
		await prisma.system.upsert({
			where: { name: system.name },
			update: {
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
			create: {
				name: system.name,
				companyId: microsoft.id,
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
		});
	}

	const pc = await prisma.company.upsert({
		where: { name: pcJson.name },
		update: {},
		create: {
			name: pcJson.name,
			foundingDate: new Date(pcJson.foundingDate),
		},
	});

	for (const system of pcJson.systems) {
		await prisma.system.upsert({
			where: { name: system.name },
			update: {
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
			create: {
				name: system.name,
				companyId: pc.id,
				usReleaseDate: new Date(system.usReleaseDate),
				jpReleaseDate: new Date(system.jpReleaseDate),
				euReleaseDate: new Date(system.euReleaseDate),
			},
		});
	}

	for (const publisher of publisherJson.publishers) {
		const country = await prisma.country.upsert({
			where: { name: publisher.country },
			update: {
				name: publisher.country,
			},
			create: {
				name: publisher.country,
			},
		});

		await prisma.publisher.upsert({
			where: { name: publisher.publisher },
			update: {
				name: publisher.publisher,
				foundingDate: new Date(publisher.year, 0),
				countryId: country.id,
			},
			create: {
				name: publisher.publisher,
				foundingDate: new Date(publisher.year, 0),
				countryId: country.id,
			},
		});
	}

	for (const developer of developerJson.developers) {
		const country = await prisma.country.upsert({
			where: { name: developer.country },
			update: {
				name: developer.country,
			},
			create: {
				name: developer.country,
			},
		});

		await prisma.developer.upsert({
			where: { name: developer.developer },
			update: {
				name: developer.developer,
				foundingDate: new Date(developer.year, 0),
				countryId: country.id,
			},
			create: {
				name: developer.developer,
				foundingDate: new Date(developer.year, 0),
				countryId: country.id,
			},
		});
	}

	for (const genre of genreJson.genres) {
		await prisma.genre.upsert({
			where: { name: genre.name },
			update: {},
			create: {
				name: genre.name,
			},
		});
	}
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

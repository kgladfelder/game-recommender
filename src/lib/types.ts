export type Game = {
	id: string;
	gameName: string;
	createdDate: Date;
	completedDate?: Date;
	platform?: Platform;
	mainStory?: number;
	mainExtras?: number;
	completionist?: number;
	genres?: Genre[];
	publisher?: string;
	developer?: string;
};

export enum Platform {
	'Steam',
	'Switch',
	'Series S/X',
	'PS5',
	'Android',
	'iOS',
	'Unknown',
}

export enum Genre {
	'Action',
	'Adventure',
	'Arcade',
	'Battle Arena',
	"Beat 'em Up",
	'Board Game',
	'Breakout',
	'Card Game',
	'City-Building',
	'Compilation',
	'Educational',
	'Fighting',
	'Fitness',
	'Flight',
	'Full Motion Video (FMV)',
	'Hack and Slash',
	'Hidden Object',
	'Horror',
	'Interactive Art',
	'Management',
	'Music/Rhythm',
	'Open World',
	'Party',
	'Pinball',
	'Platform',
	'Puzzle',
	'Racing/Driving',
	'Roguelike',
	'Role-Playing',
	'Sandbox',
	'Shooter',
	'Simulation',
	'Social',
	'Sports',
	'Stealth',
	'Strategy/Tactical',
	'Survival',
	'Tower Defense',
	'Trivia',
	'Vehicular Combat',
	'Visual Novel',
	'Undefined',
}

export type hltbSearch = {
	detailId: string,
	gameName: string,
	gameDescription: string,
	platforms: string[],
	gameImage: string,
	timeLabels: string[][],
	main: number,
	mainExtra: number,
	complete: number,
	distancePercentage: number,
	searchGameName: string
}
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

import * as cheerio from 'cheerio';

import type { hltbSearch } from '$lib/types';
import { hltbParseTime } from '$lib/utils';

export async function GET({ url }: RequestEvent) {
	const gameId = url.searchParams?.get('id');

	const baseUrl = 'https://howlongtobeat.com/';
	const detailUrl = `${baseUrl}game?id=${gameId}`;

	if (!gameId) {
		throw error(400, 'Must provide a gameId');
	}

	const resultData = await fetch(detailUrl, {
		method: 'GET',
		headers: {
			'Content-type': 'application/x-www-form-urlencoded',
			origin: 'https://howlongtobeat.com',
			referer: 'https://howlongtobeat.com',
		},
	})
		.then(function (response) {
			return response.text();
		})
		.then(function (data) {
			return data;
		})
		.catch((error) => {
			if (error.response.status !== 200) {
				throw new Error(`Got non-200 status code from howlongtobeat.com [${error.response.status}]
			${JSON.stringify(error.response)}
		  `);
			}
		});

	if (!resultData) {
		throw new Error('No data returned from HLTB');
	}

	const $ = cheerio.load(resultData);
	let gameName = '';
	let imageUrl = '';
	const timeLabels: string[][] = [];
	let gameplayMain = 0;
	let gameplayMainExtra = 0;
	let gameplayComplete = 0;
	let naRelease = undefined;
	let euRelease = undefined;
	let jpRelease = undefined;

	gameName = $('.profile_header').text().trim();
	imageUrl = $('.game_image img')[0].attribs.src;

	const liElements = $('.game_times li');
	const gameDescription = $('.in.back_primary.shadow_box div.profile_info.large').text();

	let platforms: string[] = [];
	let genres: string[] = [];
	let publisher = '';
	let developer = '';
	$('.profile_info').each(function () {
		const metaData = $(this).text();
		if (metaData.includes('Platforms:')) {
			platforms = metaData
				.replace(/\n/g, '')
				.replace('Platforms:', '')
				.split(',')
				.map((data) => data.trim());
		} else if (metaData.includes('Genres:')) {
			genres = metaData
				.replace(/\n/g, '')
				.replace('Genres:', '')
				.split(',')
				.map((data) => data.trim());
		} else if (metaData.includes('Publisher:')) {
			publisher = metaData.replace(/\n/g, '').replace('Publisher:', '').trim();
		} else if (metaData.includes('Developer:')) {
			developer = metaData.replace(/\n/g, '').replace('Developer:', '').trim();
		} else if (metaData.includes('NA:')) {
			naRelease = new Date(metaData.replace(/\n/g, '').replace('NA:', '').trim());
		} else if (metaData.includes('EU:')) {
			euRelease = new Date(metaData.replace(/\n/g, '').replace('EU:', '').trim());
		} else if (metaData.includes('JP:')) {
			jpRelease = new Date(metaData.replace(/\n/g, '').replace('JP:', '').trim());
		}
	});

	liElements.each(function () {
		const type: string = $(this).find('h5').text();
		const time: number = hltbParseTime($(this).find('div').text());
		if (
			type.startsWith('Main Story') ||
			type.startsWith('Single-Player') ||
			type.startsWith('Solo')
		) {
			gameplayMain = time;
			timeLabels.push(['gameplayMain', type]);
		} else if (type.startsWith('Main + Extra') || type.startsWith('Co-Op')) {
			gameplayMainExtra = time;
			timeLabels.push(['gameplayMainExtra', type]);
		} else if (type.startsWith('Completionist') || type.startsWith('Vs.')) {
			gameplayComplete = time;
			timeLabels.push(['gameplayComplete', type]);
		}
	});

	const gameDetail: hltbSearch = {
		detailId: gameId,
		gameName,
		gameDescription,
		platforms,
		genres: genres,
		gameImage: imageUrl,
		timeLabels,
		main: gameplayMain,
		mainExtra: gameplayMainExtra,
		complete: gameplayComplete,
		distancePercentage: 1,
		searchGameName: gameName,
		publisher,
		developer,
		naRelease,
		euRelease,
		jpRelease,
	};

	return json(gameDetail);
}

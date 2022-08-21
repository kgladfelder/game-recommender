import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

import * as cheerio from 'cheerio';

import type { hltbSearch } from '$lib/types';
import { hltbCalcDistancePercentage, hltbParseTime } from '$lib/utils';

export async function GET({ url }: RequestEvent) {
	const searchGameName = url.searchParams?.get('gameName');

	const baseUrl = 'https://howlongtobeat.com/';
	const searchUrl = `${baseUrl}search_results`;

	if (!searchGameName) {
		throw error(400, 'Must provide a gameName');
	}

	const form = new URLSearchParams();
	form.append('queryString', searchGameName);
	form.append('t', 'games');
	form.append('sorthead', 'popular');
	form.append('sortd', 'Normal Order');
	form.append('plat', '');
	form.append('length_type', 'main');
	form.append('length_min', '');
	form.append('length_max', '');
	form.append('detail', '0');
	form.append('v', '');
	form.append('f', '');
	form.append('g', '');
	form.append('randomize', '0');

	const resultData = await fetch(searchUrl, {
		body: form,
		method: 'POST',
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
				throw new Error(
					`Got non-200 status code from howlongtobeat.com [${
						error.response.status
					}]: ${JSON.stringify(error.response)}`
				);
			}
		});

	if (!resultData) {
		throw new Error('No data returned;');
	}

	const results: hltbSearch[] = [];
	const $ = cheerio.load(resultData);

	if ($('h3').length > 0) {
		const liElements = $('li');
		liElements.each(function () {
			const gameTitleAnchor = $(this).find('a')[0];
			const gameName: string = gameTitleAnchor.attribs.title;
			const detailId: string = gameTitleAnchor.attribs.href.substring(
				gameTitleAnchor.attribs.href.indexOf('?id=') + 4
			);
			const gameImage: string = $(gameTitleAnchor).find('img')[0].attribs.src;

			const timeLabels: string[][] = [];
			let main = 0;
			let mainExtra = 0;
			let complete = 0;

			try {
				$(this)
					.find('.search_list_details_block div.shadow_text')
					.each(function () {
						const type = $(this).text();
						if (
							type.startsWith('Main Story') ||
							type.startsWith('Single-Player') ||
							type.startsWith('Solo')
						) {
							const time: number = hltbParseTime($(this).next().text());
							main = time;
							timeLabels.push(['gameplayMain', type]);
						} else if (type.startsWith('Main + Extra') || type.startsWith('Co-Op')) {
							const time: number = hltbParseTime($(this).next().text());
							mainExtra = time;
							timeLabels.push(['gameplayMainExtra', type]);
						} else if (type.startsWith('Completionist') || type.startsWith('Vs.')) {
							const time: number = hltbParseTime($(this).next().text());
							complete = time;
							timeLabels.push(['gameplayCompletionist', type]);
						}
					});
			} catch (e) {
				console.error(e);
			}
			const entry: hltbSearch = {
				detailId,
				gameName,
				gameDescription: '',
				platforms: [],
				genres: [],
				gameImage,
				timeLabels,
				main,
				mainExtra,
				complete,
				distancePercentage: hltbCalcDistancePercentage(gameName, searchGameName),
				searchGameName,
				publisher: '',
				developer: '',
				naRelease: undefined,
				euRelease: undefined,
				jpRelease: undefined,
			};
			results.push(entry);
		});
	}
	return json(results);
}

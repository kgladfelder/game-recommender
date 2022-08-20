import { distance } from 'fastest-levenshtein';

export const hltbParseTime = (text: string): number => {
	if (text.startsWith('--')) {
		return 0;
	}
	if (text.indexOf(' - ') > -1) {
		return hltbHandleRange(text);
	}
	return hltbGetTime(text);
};

export const hltbHandleRange = (text: string): number => {
	const range: Array<string> = text.split(' - ');
	const d: number = (hltbGetTime(range[0]) + hltbGetTime(range[1])) / 2;
	return d;
};

export const hltbGetTime = (text: string): number => {
	const timeUnit = text.substring(text.indexOf(' ') + 1).trim();
	if (timeUnit === 'Mins') {
		return 1;
	}
	const time: string = text.substring(0, text.indexOf(' '));
	if (time.indexOf('½') > -1) {
		return 0.5 + parseInt(time.substring(0, text.indexOf('½')));
	}
	return parseInt(time);
};

export const hltbCalcDistancePercentage = (text: string, term: string): number => {
	let longer: string = text.toLowerCase().trim();
	let shorter: string = term.toLowerCase().trim();
	if (longer.length < shorter.length) {
		// longer should always have
		// greater length
		const temp: string = longer;
		longer = shorter;
		shorter = temp;
	}
	const longerLength: number = longer.length;
	if (longerLength == 0) {
		return 1.0;
	}
	const dist = distance(longer, shorter);
	return Math.round(((longerLength - dist) / longerLength) * 100) / 100;
};

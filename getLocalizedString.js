import Localization from './localization.js';
import { vsprintf } from 'sprintf-js';

const DefaultUserLang = Localization.defaultLanguageCode();

const merge = require('lodash.merge');

function getLangFile(code) {
	const toMerge = merge();

	const loadFound = require('./locales/found.json');

	if (code === 'en') {
		// english
		for (let i = 0; i < loadFound.languages.length; i++) {
			if (loadFound.languages[i].lang === 'english') {
				const getJSONFile = require('./locales/english/' + loadFound.languages[i].file);

				merge(toMerge, getJSONFile);
			}
		}
	} else if (code === 'es') {
		// spanish
		for (let i = 0; i < loadFound.languages.length; i++) {
			if (loadFound.languages[i].lang === 'spanish') {
				const getJSONFile = require('./locales/spanish/' + loadFound.languages[i].file);

				merge(toMerge, getJSONFile);
			}
		}
	} else if (code === 'pt') {
		// portuguese
		for (let i = 0; i < loadFound.languages.length; i++) {
			if (loadFound.languages[i].lang === 'portuguese') {
				const getJSONFile = require('./locales/portuguese/' + loadFound.languages[i].file);

				merge(toMerge, getJSONFile);
			}
		}
	/*} else if (code === 'tr') {
		// turkish
		for (let i = 0; i < loadFound.languages.length; i++) {
			if (loadFound.languages[i].lang === 'turkish') {
				const getJSONFile = require('./locales/turkish/' + loadFound.languages[i].file);

				merge(toMerge, getJSONFile);
			}
		}*/
	} else {
		// fallback
		for (let i = 0; i < loadFound.languages.length; i++) {
			if (loadFound.languages[i].lang === 'english') {
				const getJSONFile = require('./locales/english/' + loadFound.languages[i].file);

				merge(toMerge, getJSONFile);
			}
		}
	}

	return toMerge;
}

function getTranslatedString(key, fallback, args, lang) {
	lang = lang || Localization.getUserLang() || DefaultUserLang;

	key = key.trim();

	// try to get translated string
	let lookup = extKey(getLangFile(lang), key);
	if (!lookup && lang !== 'en') {
		// try fallback to english
		lookup = extKey(getLangFile('en'), key);
	}

	if (!lookup) {
		return fallback || key + ' untranslated in ' + lang + ' and en JSON';
	}

	if (args && args.constructor === Array) {
		lookup = vsprintf(lookup, args);
	}

	return lookup;
}

function extKey(obj, str) {
	str = str.replace(/\[(\w+)\]/g, '.$1'); // let's convert indexes to properties
	str = str.replace(/^\./, ''); // gets rid of leading dot

	const a = str.split('.');

	for (let i = 0, n = a.length; i < n; i++) {
		const key = a[i];

		if (key in obj) {
			obj = obj[key];
		} else {
			return null;
		}
	}
	return obj;
}

module.exports = getTranslatedString;

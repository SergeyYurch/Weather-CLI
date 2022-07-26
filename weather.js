#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printSucces, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DIKTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DIKTIONARY.token, token);
		printSucces('Токен сохранен');
	} catch (e) {
		printError(e.message);
	}
}


const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан токен');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DIKTIONARY.city, city);
		printSucces('Город сохранен');
	} catch (e) {
		printError(e.message);
	}
}


const getForcast = async () => {
	try {

		const weather = await getWeather();
		console.log(weather)
		const icon = getIcon(weather.weather[0].icon);
		printWeather(weather, icon)
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');

		}
		else {
			printError(e.message);
		}
	}

};

const initCLI = () => {
	const args = getArgs(process.argv)

	if (args.h) {
		return printHelp();
	};

	if (args.s) {
		return saveCity(args.s)
	};

	if (args.t) {
		return saveToken(args.t);

	}
	return getForcast();
};

initCLI(); 
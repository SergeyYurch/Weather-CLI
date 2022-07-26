import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSucces = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};


const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров -  вывод погоды
		-s [SYTY] для установки города
		-h для вывода помощи
		-t [APY_KEY] для сохранения токена
	`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`${chalk.bgYellow('WEATHER ')}Погода в городе ${res.name}
		${icon}${res.weather[0].description}
		Температура: ${res.main.temp}(ощущается как)${res.main.feels_like} 
		Влажность: ${res.main.humidity}%
		Скорость верта: ${res.wind.speed}
		
	`
	);
};
export { printError, printSucces, printHelp, printWeather }
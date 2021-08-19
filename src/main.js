import faker from 'faker';
import { CryptoBlock } from './entities/CryptoBlock.js';
import { CryptoBlockchain } from './entities/CryptoBlockchain.js';

(() => {

	let index = 0;

	const bitcoin = new CryptoBlockchain();

	setInterval(() => {

		const data = {
			sender: faker.name.findName(),
			recipient: faker.name.findName(),
			quantity: 50
		};

		const genBlock = new CryptoBlock({ index, data });

		bitcoin.addNewBlock(genBlock);
		index++;

		console.log(JSON.stringify(bitcoin, null, 4));

	}, 2500);
})();

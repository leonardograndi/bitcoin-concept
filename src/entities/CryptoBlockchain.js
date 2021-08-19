import { CryptoBlock } from './CryptoBlock.js';

export class CryptoBlockchain {

	constructor() {
		this.blockchain = [this.startGenesisBlock];
		this.difficulty = 2;
	}

	startGenesisBlock() {
		return new CryptoBlock(0, 'Initial Block in the Chain', '0');
	}

	obtainLatestBlock() {
		return this.blockchain[this.blockchain.length - 1];
	}

	addNewBlock(block) {
		block.precedingHash = this.obtainLatestBlock().hash;
		// block.hash = block.computeHash();
		block.proofOfWork(this.difficulty);
		this.blockchain.push(block);
	}

	checkChainValidity() {
		for (let i = 1; i < this.blockchain.length; i++) {
			const currentBlock = this.blockchain[i];
			const precedingBlock = this.blockchain[i - 1];

			if (currentBlock.hash !== currentBlock.computeHash()) {
				return false;
			}
			if (currentBlock.precedingHash !== precedingBlock.hash) return false;
		}
		return true;
	}

}

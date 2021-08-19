import CryptoJS from 'crypto-js';
import moment from 'moment';

export class CryptoBlock {

	/**
	 * constructor
	 * @param index It’s a unique number that tracks the position of every block in the entire blockchain.
	 * @param timestamp It keeps a record of the time of occurrence of each completed transaction.
	 * @param data It provides data about the completed transactions, such as the sender details, recipient’s details, and quantity transacted.
	 * @param precedingHash It points to the hash of the preceding block in the blockchain, something important in maintaining the blockchain’s integrity.
	 *
	 */

	constructor({ index, data, precedingHash = ' ' }) {
		this.index = index;
		this.timestamp = moment();
		this.data = data;
		this.precedingHash = precedingHash;
		this.hash = this.computeHash();
		this.nonce = 0;
	}

	/**
	 * computeHash
	 *
	 *
	 * @returns
	 */
	computeHash() {
		return CryptoJS.SHA256(
			this.index
			+
			this.precedingHash
			+
			this.timestamp
			+
			JSON.stringify(this.data)
			+
			this.nonce
		).toString();
	}

	proofOfWork(difficulty) {
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
		) {
			this.nonce++;
			this.hash = this.computeHash();
		}
	}


}

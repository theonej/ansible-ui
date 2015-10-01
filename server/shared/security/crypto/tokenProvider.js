import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

const SALT_GENERATION_ROUNDS = 10;
const ENCRYPTION_ALGORITHM = 'aes256';

let _key = process.env.aes256Key;

export function generateToken(user) {

	let expiration = new Date();
	expiration.setHours(expiration.getHours() + 24);

	let tokenString = user.userId + '|' + expiration.toString();

	let key = _key;

	let authToken = encryptString(tokenString, key);

	let salt = bcrypt.genSaltSync(SALT_GENERATION_ROUNDS);
	let tokenHash = generateHash(authToken);

	authToken = authToken + ':' + encodeURIComponent(tokenHash);

	return authToken;
};

export function validateToken(authToken) {
	let userId = null;

	let tokenParts = authToken.split(':');
	if (tokenParts.length === 2) {

		let hashValidated = compareHash(tokenParts[0], decodeURIComponent(tokenParts[1]));

		if (hashValidated) {
			let key = _key;
			let tokenString = decryptString(tokenParts[0], key);

			var tokenStringParts = tokenString.split('|');
			if (tokenParts.length === 2) {
				let expirationValid = validateExpiration(tokenStringParts[1]);
				if (expirationValid) {
					userId = tokenStringParts[0];
				}
			}
		}
	}

	return userId;
};

export function compareHash(rawString, hash) {
	let result = bcrypt.compareSync(rawString, hash);

	return result;
};

export function generateHash(rawString) {
	let salt = bcrypt.genSaltSync(SALT_GENERATION_ROUNDS);
	let hash = bcrypt.hashSync(rawString, salt);

	return hash;
};

export function encryptString(rawText, key) {
	let cipher = crypto.createCipher(ENCRYPTION_ALGORITHM, key);
	let encrypted = cipher.update(rawText, 'utf8', 'hex') + cipher.final('hex');

	return encrypted;
};

export function decryptString(cipherText, key) {
	let decipher = crypto.createDecipher(ENCRYPTION_ALGORITHM, key);

	let clearText = decipher.update(cipherText, 'hex', 'utf8') + decipher.final('utf8');

	return clearText;
};

function validateExpiration(expiration) {

	var valid = false;
	var expirationDate = new Date(expiration);
	var currentDate = new Date();

	if (expirationDate > currentDate) {
		valid = true;
	}
	return valid;
};
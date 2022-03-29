import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';
import CryptoJS from 'crypto-js';

const tvPointPayEncryptKey = process.env.REACT_APP_TV_POINT_PAY_ENCRYPT_KEY as string;
const settingLockPasswordEncryptKey = process.env.REACT_APP_SETTING_LOCK_PASSWORD_ENCRYPT_KEY as string;
const cookieAuthDataEncryptKey = process.env.REACT_APP_COOKIE_AUTH_DATA_ENCRYPT_KEY as string;
const cookieDeviceSystemInfoEncryptKey = process.env.REACT_APP_COOKIE_DEVICE_SYSTEM_INFO_ENCRYPT_KEY as string;
const authDataEncryptKey = process.env.REACT_APP_AUTH_DATA_ENCRYPT_KEY as string;
const deviceDataEncryptKey = process.env.REACT_APP_DEVICE_DATA_ENCRYPT_KEY as string;
const linkExternalEncryptKey = process.env.REACT_APP_LINK_EXTERNAL_ENCRYPT_KEY as string;
const externalSbcContNoEncryptKey = process.env.REACT_APP_EXTERNAL_SBC_CONT_NO_ENCRYPT_KEY as string;
const autoLoginEncryptKeyIOS = process.env.REACT_APP_AUTO_LOGIN_ENCRYPT_KEY_IOS as string;
const autoLoginEncryptKeyAndroid = process.env.REACT_APP_AUTO_LOGIN_ENCRYPT_KEY_ANDROID as string;
const bridgeEncryptKey = process.env.REACT_APP_BRIDGE_ENCRYPT_KEY as string;
const iv = Utf8.parse('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
const gatewayEncryptKey = process.env.REACT_APP_GATEWAY_ENCRYPT_KEY as string;
const storageEncryptKey = process.env.REACT_APP_STORAGE_ENCRYPT_KEY as string;
const mmpEncryptKey = process.env.REACT_APP_MMP_ENCRYPT_KEY as string;

function encrypt(text: string, key: string): string {
	return AES.encrypt(Utf8.parse(text), Utf8.parse(key), { iv }).toString();
}

function decrypt(encrypted: string, key: string): string {
	return AES.decrypt(encrypted, Utf8.parse(key), { iv }).toString(Utf8);
}

// 자동로그인 인계 파라미터
export function encryptAutoLoginParam(text: string, platform: 'iOS' | 'Android'): string {
	if (platform === 'iOS') {
		return AES.encrypt(Utf8.parse(text), Hex.parse(autoLoginEncryptKeyIOS), { iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString();
	}
	return AES.encrypt(Utf8.parse(text), Utf8.parse(autoLoginEncryptKeyAndroid), {
		iv: Utf8.parse(autoLoginEncryptKeyAndroid.substring(0, 16)),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString();
}

export function decryptAutoLoginParam(encrypted: string, platform: 'iOS' | 'Android'): string {
	if (platform === 'iOS') {
		return AES.decrypt(encrypted, Hex.parse(autoLoginEncryptKeyIOS), { iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(Utf8);
	}
	return AES.decrypt(encrypted, Utf8.parse(autoLoginEncryptKeyAndroid), {
		iv: Utf8.parse(autoLoginEncryptKeyAndroid.substring(0, 16)),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString(Utf8);
}

export function encryptSData(text: string, platform: 'iOS' | 'Android'): string {
	return encryptAutoLoginParam(text, platform);
}

export function decryptSData(encrypted: string, platform: 'iOS' | 'Android'): string {
	return decryptAutoLoginParam(encrypted, platform);
}

// TV Point 결제 파라미터

export function encryptTVPointPayParam(text: string): string {
	return encrypt(text, tvPointPayEncryptKey);
}

// 잠금 암호

export function encryptSettingLockPassword(text: string): string {
	return encrypt(text, settingLockPasswordEncryptKey);
}

export function decryptSettingLockPassword(encrypted: string): string {
	return decrypt(encrypted, settingLockPasswordEncryptKey);
}

// Cookie auth_params

export function encryptCookieAuthParamsString(text: string): string {
	return encrypt(text, cookieAuthDataEncryptKey);
}

export function decryptCookieAuthParamsString(encrypted: string): string {
	try {
		const decrypted = decrypt(encrypted, cookieAuthDataEncryptKey);
		return decrypted && decrypted.length > 0 ? decrypted : encrypted;
	} catch (error) {}
	return encrypted;
}

// Cookie vips_device_system_info

export function decryptCookieDeviceSystemInfoString(encrypted: string): string {
	try {
		const decrypted = decrypt(encrypted, cookieDeviceSystemInfoEncryptKey);
		return decrypted && decrypted.length > 0 ? decrypted : encrypted;
	} catch (error) {}
	return encrypted;
}

// authData

export function encryptAuthDataString(text: string): string {
	return encrypt(text, authDataEncryptKey);
}

export function decryptAuthDataString(encrypted: string): string {
	try {
		return decrypt(encrypted, authDataEncryptKey);
	} catch (error) {}
	return encrypted;
}

// deviceData

export function encryptDeviceDataString(text: string): string {
	return encrypt(text, deviceDataEncryptKey);
}

export function decryptDeviceDataString(encrypted: string): string {
	try {
		return decrypt(encrypted, deviceDataEncryptKey);
	} catch (error) {}
	return encrypted;
}

export function encryptApiProtocolParam(text: string): string {
	const sha256 = CryptoJS.SHA256(bridgeEncryptKey);
	return AES.encrypt(text, sha256, { iv: Hex.parse(sha256.toString().substring(0, 32)), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
}

export function decryptApiProtocolParam(encrypted: string): string {
	const sha256 = CryptoJS.SHA256(bridgeEncryptKey);
	return AES.decrypt(encrypted, sha256, { iv: Hex.parse(sha256.toString().substring(0, 32)), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(
		Utf8,
	);
}

// MMP enc_id 암호화 처리 함수
export function encryptmmpApiProtocolParam(text: string): string {
	const secretKey = CryptoJS.enc.Utf8.parse(mmpEncryptKey);
	return AES.encrypt(text, secretKey, { iv: secretKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
}
// MMP enc_id 복호화 처리 함수
export function decryptmmpApiProtocolParam(encrypted: string): string {
	const secretKey = CryptoJS.enc.Utf8.parse(mmpEncryptKey);
	return AES.decrypt(encrypted, secretKey, { iv: secretKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(Utf8);
}

export function encryptNativeProcolParam(text: string): string {
	return encryptApiProtocolParam(text);
}

export function decryptNativeProtocolParam(encrypted: string): string {
	return decryptApiProtocolParam(encrypted);
}

export function encryptedGateWayParam(text: string): string {
	return AES.encrypt(Utf8.parse(text), Utf8.parse(gatewayEncryptKey), {
		iv: Utf8.parse(gatewayEncryptKey.substring(0, 16)),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	}).toString();
}

export function encryptStorageString(text: string): string {
	return encrypt(text, storageEncryptKey);
}

export function decryptStorageString(encrypted: string): string {
	try {
		return decrypt(encrypted, storageEncryptKey);
	} catch (error) {}
	return encrypted;
}

export function convertSHA512EnCodeBase64(text: string): string {
	const sha512 = CryptoJS.SHA512(text);
	return sha512.toString(CryptoJS.enc.Base64);
}

// firebase dynamic link external={encrypted}
export function encryptExternalData(text: string): string {
	return encodeURIComponent(encrypt(text, linkExternalEncryptKey));
}

export function decryptExternalData(encrypted: string): string {
	return decrypt(decodeURIComponent(encrypted), linkExternalEncryptKey);
}

export function encryptExternalSbcConyNoData(text: string): string {
	return encrypt(text, externalSbcContNoEncryptKey);
}

import { OpenSenseMapID, RFC3339Date } from '../globalTypes';

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L29
 */
export type UserData = {
	name: UserName;
	email: string;
	role: UserRole;
	language: Language;
	boxes: OpenSenseMapID[];
	sharedBoxes?: OpenSenseMapID[];
	emailIsConfirmed: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L115
 */
export type UserDataWithSecrets = UserData & {
	_id: OpenSenseMapID;
	unconfirmedEmail: string;
	lastUpdatedBy: RFC3339Date;
	createdAt: RFC3339Date;
	updatedAt: RFC3339Date;
};

/**
 * The user name must consist of at least 3 and up to 40 characters and only allows to use alphanumerics (a-zA-Z0-9), dots (.), dashes (-), underscores (_) and spaces. The first character must be a letter or number.
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L30
 */
export type UserName = string;

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L88
 */
export type UserRole = 'user' | 'admin';

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L68
 */
export type Language = 'de_DE' | 'en_US' | string;

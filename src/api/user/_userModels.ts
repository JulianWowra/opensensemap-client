import { type Infer, array, boolean, enums, intersection, object, optional, pattern, string } from 'superstruct';
import { DATE_RFC3339, OPENSENSEMAP_ID } from '../globalTypes';

/**
 * The user name must consist of at least 3 and up to 40 characters and only allows to use alphanumerics (a-zA-Z0-9), dots (.), dashes (-), underscores (_) and spaces. The first character must be a letter or number.
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L30|OpenSenseMap API code reference on GitHub}
 */
export const USER_NAME = pattern(string(), /^[a-zA-Z0-9][a-zA-Z0-9 .\-_]{2,39}$/);
export type UserName = Infer<typeof USER_NAME>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L88|OpenSenseMap API code reference on GitHub}
 */
export const USER_ROLE = enums(['user', 'admin']);
export type UserRole = Infer<typeof USER_ROLE>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L68|OpenSenseMap API code reference on GitHub}
 */
export const LANGUAGE = enums(['de_DE', 'en_US']);
export type Language = Infer<typeof LANGUAGE>;

export const EMAIL_ADDRESS = pattern(string(), /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
export type EmailAddress = Infer<typeof EMAIL_ADDRESS>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L29|OpenSenseMap API code reference on GitHub}
 */
export const USER_DATA = object({
	name: USER_NAME,
	email: string(),
	role: USER_ROLE,
	language: LANGUAGE,
	boxes: array(OPENSENSEMAP_ID),
	sharedBoxes: optional(array(OPENSENSEMAP_ID)),
	emailIsConfirmed: boolean(),
	integrations: optional(object())
});

export type UserData = Infer<typeof USER_DATA>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/user/user.js#L115|OpenSenseMap API code reference on GitHub}
 */
export const USER_DATA_WITH_SECRETS = intersection([
	USER_DATA,
	object({
		_id: OPENSENSEMAP_ID,
		unconfirmedEmail: string(),
		lastUpdatedBy: DATE_RFC3339,
		createdAt: DATE_RFC3339,
		updatedAt: DATE_RFC3339
	})
]);

export type UserDataWithSecrets = Infer<typeof USER_DATA_WITH_SECRETS>;

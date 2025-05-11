import axios from 'axios';
import { enums, literal, mask, object, union } from 'superstruct';
import { type Language, USER_DATA } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-updateUser
 */
export async function updateUser(currentPassword: string, authorization: string, options: UpdateUserOptions) {
	const response = await axios.put(
		'https://api.opensensemap.org/users/me',
		Object.assign(
			{
				currentPassword
			},
			options
		),
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return mask(response.data, UPDATE_USER_RESULT);
}

export type UpdateUserOptions = {
	email?: string;
	language?: Language;
	name?: string;
	newPassword?: string;
	integrations?: object;
};

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L303|OpenSenseMap API code reference on GitHub}
 */
const UPDATE_USER_RESULT_UPDATED = object({
	code: literal('Ok'),
	message: enums([
		'User successfully saved.',
		'User successfully saved. E-Mail changed. Please confirm your new address. Until confirmation, sign in using your old address',
		'User successfully saved. Password changed. Please sign in with your new password'
	]),
	data: object({
		me: USER_DATA
	})
});

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/11695a33cf0260a62aecbefd76c46735b690be62/packages/api/lib/controllers/usersController.js#L320|OpenSenseMap API code reference on GitHub}
 */
const UPDATE_USER_RESULT_USER_NOT_UPDATED = object({
	code: literal('Ok'),
	message: literal('User not updated. No changed properties supplied.')
});

const UPDATE_USER_RESULT = union([UPDATE_USER_RESULT_UPDATED, UPDATE_USER_RESULT_USER_NOT_UPDATED]);

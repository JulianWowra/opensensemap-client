import axios from 'axios';
import { Language, UserData } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-updateUser
 */
export async function updateUser(currentPassword: string, authorization: string, options: UpdateUserOptions): Promise<UpdateUserResult> {
	return (
		await axios.put(
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
		)
	).data;
}

export type UpdateUserOptions = {
	email?: string;
	language?: Language;
	name?: string;
	newPassword?: string;
	integrations?: object;
};

export type UpdateUserResult = UpdateUserResultResultUpdated | UpdateUserResultUserNotUpdated;

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L303
 */
export type UpdateUserResultResultUpdated = {
	code: 'Ok';
	message:
		| 'User successfully saved.'
		| 'User successfully saved. E-Mail changed. Please confirm your new address. Until confirmation, sign in using your old address'
		| 'User successfully saved. Password changed. Please sign in with your new password';
	data: {
		me: UserData;
	};
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/11695a33cf0260a62aecbefd76c46735b690be62/packages/api/lib/controllers/usersController.js#L320
 */
export type UpdateUserResultUserNotUpdated = {
	code: 'Ok';
	message: 'No changed properties supplied. User remains unchanged.';
};

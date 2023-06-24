import axios from 'axios';
import { UserData } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUser
 */
export async function getUser(authorization: string): Promise<GetUserResult> {
	return (
		await axios.get('https://api.opensensemap.org/users/me', {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L274
 */
export type GetUserResult = {
	code: 'Ok';
	data: {
		me: UserData;
	};
};

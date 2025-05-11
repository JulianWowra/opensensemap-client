import axios from 'axios';
import { literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-deleteUser
 */
export async function deleteUser(password: string, authorization: string) {
	const response = await axios.delete('https://api.opensensemap.org/users/me', {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: {
			password
		}
	});

	return mask(response.data, DELETE_USER_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L330
 */
const DELETE_USER_RESULT = object({
	code: literal('Ok'),
	message: literal('User and all boxes of user marked for deletion. Bye Bye!')
});

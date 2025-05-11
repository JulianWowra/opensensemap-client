import axios from 'axios';
import { literal, mask, object } from 'superstruct';
import { USER_DATA } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUser
 */
export async function getUser(authorization: string) {
	const response = await axios.get('https://api.opensensemap.org/users/me', {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, GET_USER_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L274|OpenSenseMap API code reference on GitHub}
 */
const GET_USER_RESULT = object({
	code: literal('Ok'),
	data: object({
		me: USER_DATA
	})
});

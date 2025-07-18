import axios from 'axios';
import { literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_out
 */
export async function signOut(authorization: string) {
	const response = await axios.post('https://api.opensensemap.org/users/sign-out', undefined, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, SIGN_OUT_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L177|OpenSenseMap API code reference on GitHub}
 */
const SIGN_OUT_RESULT = object({
	code: literal('Ok'),
	message: literal('Successfully signed out')
});

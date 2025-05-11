import axios from 'axios';
import { literal, mask, object, string } from 'superstruct';
import { USER_DATA } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-refresh_auth
 */
export async function refreshAuth(refreshToken: string) {
	const response = await axios.post('https://api.opensensemap.org/users/refresh-auth', {
		token: refreshToken
	});

	return mask(response.data, REFRESH_AUTH_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L153|OpenSenseMap API code reference on GitHub}
 */
const REFRESH_AUTH_RESULT = object({
	code: literal('Authorized'),
	message: literal('Successfully refreshed auth'),
	data: object({
		user: USER_DATA
	}),
	token: string(),
	refreshToken: string()
});

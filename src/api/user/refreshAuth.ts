import axios from 'axios';
import { type Infer, literal, mask, object, string } from 'superstruct';
import { USER_DATA } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-refresh_auth
 */
export async function refreshAuth(refreshToken: string): Promise<RefreshAuthResult> {
	const response = await axios.post('https://api.opensensemap.org/users/refresh-auth', {
		token: refreshToken
	});

	return mask(response.data, REFRESH_AUTH_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L153
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

export type RefreshAuthResult = Infer<typeof REFRESH_AUTH_RESULT>;

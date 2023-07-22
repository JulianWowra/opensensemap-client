import axios from 'axios';
import { UserData } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-refresh_auth
 */
export async function refreshAuth(refreshToken: string): Promise<RefreshAuthResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/refresh-auth', {
			token: refreshToken
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L153
 */
export type RefreshAuthResult = {
	code: 'Authorized';
	message: 'Successfully refreshed auth';
	data: {
		user: UserData;
	};
	token: string;
	refreshToken: string;
};

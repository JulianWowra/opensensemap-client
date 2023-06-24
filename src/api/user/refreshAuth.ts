import axios from 'axios';
import { User } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-refresh_auth
 */
export async function refreshAuth(token: string): Promise<RefreshAuthResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/refresh-auth', {
			token
		})
	).data;
}

export type RefreshAuthResult = {
	code: 'Authorized';
	message: 'Successfully refreshed auth';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
};

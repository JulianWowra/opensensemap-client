import axios from 'axios';
import { User } from './_userModels';

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

export type GetUserResult = {
	code: 'Ok';
	data: {
		me: User;
	};
};

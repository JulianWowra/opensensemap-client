import axios from 'axios';
import { UserNotUpdated, UserUpdated } from './_userModels';

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
	language?: 'en_US' | 'de_DE';
	name?: string;
	newPassword?: string;
};

export type UpdateUserResult = UserUpdated | UserNotUpdated;

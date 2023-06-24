import axios from 'axios';
import { User } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-register
 */
export async function register(name: string, email: string, password: string, options?: RegisterOptions): Promise<RegisterResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/users/register',
			Object.assign(
				{
					name,
					email,
					password
				},
				options
			)
		)
	).data;
}

export type RegisterOptions = {
	language: string;
};

export type RegisterResult = {
	code: 'Created';
	message: 'Successfully registered new user';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
};

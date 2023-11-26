import axios from 'axios';
import { Language, UserData, UserName } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-register
 */
export async function register(userName: UserName, email: string, password: string, options?: RegisterOptions): Promise<RegisterResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/users/register',
			Object.assign(
				{
					name: userName,
					email,
					password
				},
				options
			)
		)
	).data;
}

export type RegisterOptions = {
	language?: Language;
	integrations?: object;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L67
 */
export type RegisterResult = {
	code: 'Created';
	message: 'Successfully registered new user';
	data: {
		user: UserData;
	};
	token: string;
	refreshToken: string;
};

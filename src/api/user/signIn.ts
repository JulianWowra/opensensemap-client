import axios from 'axios';
import { UserData } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_in
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/sign-in', {
			email,
			password
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L118
 */
export type SignInResult = {
	code: 'Authorized';
	message: 'Successfully signed in';
	data: {
		user: UserData;
	};
	token: string;
	refreshToken: string;
};

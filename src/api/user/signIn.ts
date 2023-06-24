import axios from 'axios';
import { User } from './_userModels';

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

export type SignInResult = {
	code: 'Authorized';
	message: 'Successfully signed in';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
};

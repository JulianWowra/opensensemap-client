import axios from 'axios';
import { type Infer, literal, mask, object, string } from 'superstruct';
import { USER_DATA } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_in
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
	const response = await axios.post('https://api.opensensemap.org/users/sign-in', {
		email,
		password
	});

	return mask(response.data, SIGN_IN_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L118
 */
const SIGN_IN_RESULT = object({
	code: literal('Authorized'),
	message: literal('Successfully signed in'),
	data: object({
		user: USER_DATA
	}),
	token: string(),
	refreshToken: string()
});

export type SignInResult = Infer<typeof SIGN_IN_RESULT>;

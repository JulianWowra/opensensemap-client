import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_out
 */
export async function signOut(authorization: string): Promise<SignOutResult> {
	const response = await axios.post('https://api.opensensemap.org/users/sign-out', undefined, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, SIGN_OUT_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L177
 */
const SIGN_OUT_RESULT = object({
	code: literal('Ok'),
	message: literal('Successfully signed out')
});

export type SignOutResult = Infer<typeof SIGN_OUT_RESULT>;

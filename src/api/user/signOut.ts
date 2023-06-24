import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_out
 */
export async function signOut(authorization: string): Promise<SignOutResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/sign-out', undefined, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L177
 */
export type SignOutResult = {
	code: 'Ok';
	message: 'Successfully signed out';
};

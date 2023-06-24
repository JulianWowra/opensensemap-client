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

export type SignOutResult = {
	code: 'Ok';
	message: 'Successfully signed out';
};

import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-request_password_reset
 */
export async function requestPasswordReset(email: string): Promise<RequestPasswordResetResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/request-password-reset', {
			email
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L193
 */
export type RequestPasswordResetResult = {
	code: 'Ok';
	message: 'Password reset initiated';
};

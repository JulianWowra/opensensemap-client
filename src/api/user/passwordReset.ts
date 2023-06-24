import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-password_reset
 */
export async function passwordReset(newPassword: string, confirmationToken: string): Promise<PasswordResetResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/password-reset', {
			password: newPassword,
			token: confirmationToken
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L193
 */
export type PasswordResetResult = {
	code: 'Ok';
	message: 'Password successfully changed. You can now login with your new password';
};

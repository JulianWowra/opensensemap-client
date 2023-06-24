import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-password_reset
 */
export async function passwordReset(password: string, token: string): Promise<PasswordResetResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/password-reset', {
			password,
			token
		})
	).data;
}

export type PasswordResetResult = {
	code: 'Ok';
	message: 'Password successfully changed. You can now login with your new password';
};

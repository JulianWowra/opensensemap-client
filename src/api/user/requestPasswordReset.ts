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

export type RequestPasswordResetResult = {
	code: 'Ok';
	message: 'Password reset initiated';
};

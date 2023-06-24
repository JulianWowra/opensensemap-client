import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-confirm_email
 */
export async function confirmEmail(email: string, token: string): Promise<ConfirmEmailResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/confirm-email', {
			email,
			token
		})
	).data;
}

export type ConfirmEmailResult = {
	code: 'Ok';
	message: 'E-Mail successfully confirmed. Thank you';
};

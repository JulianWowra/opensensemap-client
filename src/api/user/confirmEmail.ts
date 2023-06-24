import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-confirm_email
 */
export async function confirmEmail(email: string, confirmationToken: string): Promise<ConfirmEmailResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/confirm-email', {
			email,
			token: confirmationToken
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L236
 */
export type ConfirmEmailResult = {
	code: 'Ok';
	message: 'E-Mail successfully confirmed. Thank you';
};

import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-resend_email_confirmation
 */
export async function resendEmailConfirmation(authorization: string): Promise<ResendEmailConfirmationResult> {
	return (
		await axios.post('https://api.opensensemap.org/users/me/resend-email-confirmation', undefined, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L362
 */
export type ResendEmailConfirmationResult = {
	code: 'Ok';
	message: string;
};

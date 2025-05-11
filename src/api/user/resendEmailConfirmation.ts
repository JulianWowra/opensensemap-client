import axios from 'axios';
import { literal, mask, object, string } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-resend_email_confirmation
 */
export async function resendEmailConfirmation(authorization: string) {
	const response = await axios.post('https://api.opensensemap.org/users/me/resend-email-confirmation', undefined, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, RESEND_EMAIL_CONFIRMATION_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L362
 */
const RESEND_EMAIL_CONFIRMATION_RESULT = object({
	code: literal('Ok'),
	message: string()
});

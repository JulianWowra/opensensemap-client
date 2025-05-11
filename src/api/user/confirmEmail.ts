import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-confirm_email
 */
export async function confirmEmail(email: string, confirmationToken: string): Promise<ConfirmEmailResult> {
	const response = await axios.post('https://api.opensensemap.org/users/confirm-email', {
		email,
		token: confirmationToken
	});

	return mask(response.data, CONFIRM_EMAIL_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L236
 */
const CONFIRM_EMAIL_RESULT = object({
	code: literal('Ok'),
	message: literal('E-Mail successfully confirmed. Thank you')
});

export type ConfirmEmailResult = Infer<typeof CONFIRM_EMAIL_RESULT>;

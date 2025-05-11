import axios from 'axios';
import { literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-password_reset
 */
export async function passwordReset(newPassword: string, confirmationToken: string) {
	const response = await axios.post('https://api.opensensemap.org/users/password-reset', {
		password: newPassword,
		token: confirmationToken
	});

	return mask(response.data, PASSWORD_RESET_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L193
 */
const PASSWORD_RESET_RESULT = object({
	code: literal('Ok'),
	message: literal('Password successfully changed. You can now login with your new password')
});

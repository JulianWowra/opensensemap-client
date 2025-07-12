import axios from 'axios';
import { literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Users-request_password_reset
 */
export async function requestPasswordReset(email: string) {
	const reponse = await axios.post('https://api.opensensemap.org/users/request-password-reset', {
		email
	});

	return mask(reponse.data, REQUEST_PASSWORD_RESET_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L193|OpenSenseMap API code reference on GitHub}
 */
const REQUEST_PASSWORD_RESET_RESULT = object({
	code: literal('Ok'),
	message: literal('Password reset initiated')
});

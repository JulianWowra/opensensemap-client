import axios from 'axios';
import { literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-claimBox
 */
export async function claimBox(transferToken: string, authorization: string) {
	const response = await axios.post(
		'https://api.opensensemap.org/boxes/claim',
		{
			token: transferToken
		},
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return mask(response.data, CLAIM_BOX_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L602|OpenSenseMap API code reference on GitHub}
 */
const CLAIM_BOX_RESULT = object({
	message: literal('Device successfully claimed!')
});

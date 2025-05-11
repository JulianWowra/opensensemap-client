import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-claimBox
 */
export async function claimBox(transferToken: string, authorization: string): Promise<ClaimBoxResult> {
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
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L602
 */
const CLAIM_BOX_RESULT = object({
	message: literal('Device successfully claimed!')
});

export type ClaimBoxResult = Infer<typeof CLAIM_BOX_RESULT>;

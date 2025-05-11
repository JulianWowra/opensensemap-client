import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-deleteBox
 */
export async function deleteBox(senseBoxId: OpenSenseMapID, password: string, authorization: string): Promise<DeleteBoxResult> {
	const response = await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: {
			password
		}
	});

	return mask(response.data, DELETE_BOX_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L491C4-L491C4
 */
const DELETE_BOX_RESULT = object({
	code: literal('Ok'),
	message: literal('box and all associated measurements marked for deletion')
});

export type DeleteBoxResult = Infer<typeof DELETE_BOX_RESULT>;

import axios from 'axios';
import { mask, object } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';
import { BOX_TRANSFER_INFORMATION } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getTransfer
 */
export async function getTransfer(senseBoxId: OpenSenseMapID, authorization: string) {
	const response = await axios.get(`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, GET_TRANSFER_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L512C3-L512C3|OpenSenseMap API code reference on GitHub}
 */
const GET_TRANSFER_RESULT = object({
	data: BOX_TRANSFER_INFORMATION
});

import axios from 'axios';
import { literal, mask, object } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';
import { BOX_TRANSFER_INFORMATION } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateTransfer
 */
export async function updateTransfer(senseBoxId: OpenSenseMapID, transferToken: string, expiresAt: DateRFC3339, authorization: string) {
	const response = await axios.put(
		`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`,
		{
			token: transferToken,
			date: expiresAt
		},
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return mask(response.data, UPDATE_TRANSFER_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L556C1-L556C2
 */
const UPDATE_TRANSFER_RESULT = object({
	message: literal('Transfer successfully updated'),
	data: BOX_TRANSFER_INFORMATION
});

import axios from 'axios';
import { mask, never } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-removeTransfer
 */
export async function removeTransfer(
	senseBoxId: OpenSenseMapID,
	transferToken: string,
	authorization: string
): Promise<RemoveTransferResult> {
	const response = await axios.delete('https://api.opensensemap.org/boxes/transfer', {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: {
			boxId: senseBoxId,
			token: transferToken
		}
	});

	if (response.status !== 204) {
		throw new Error('Failed to remove transfer!');
	}

	return mask(response.data, REMOVE_TRANSFER_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L578C3-L578C3
 */
const REMOVE_TRANSFER_RESULT = never();
export type RemoveTransferResult = never;

import axios from 'axios';
import { OpenSenseMapID, RFC3339Date } from '../globalTypes';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateTransfer
 */
export async function updateTransfer(
	senseBoxId: OpenSenseMapID,
	transferToken: string,
	expiresAt: RFC3339Date,
	authorization: string
): Promise<UpdateTransferResult> {
	return (
		await axios.put(
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
		)
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L556C1-L556C2
 */
export type UpdateTransferResult = {
	message: 'Transfer successfully updated';
	data: BoxTransferInformation;
};

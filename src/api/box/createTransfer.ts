import axios from 'axios';
import { OpenSenseMapID, RFC3339Date } from '../globalTypes';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-createTransfer
 */
export async function createTransfer(
	senseBoxId: OpenSenseMapID,
	expiresAt: RFC3339Date,
	authorization: string
): Promise<CreateTransferResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/boxes/transfer',
			{
				boxId: senseBoxId,
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
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L533C2-L533C3
 */
export type CreateTransferResult = {
	message: 'Box successfully prepared for transfer';
	data: BoxTransferInformation;
};

import axios from 'axios';
import { RFC3339Date } from '../globalTypes';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-createTransfer
 */
export async function createTransfer(senseBoxId: string, expiresAt: RFC3339Date, authorization: string): Promise<CreateTransferResult> {
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

export type CreateTransferResult = {
	message: 'Box successfully prepared for transfer';
	data: BoxTransferInformation;
};

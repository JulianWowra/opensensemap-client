import axios from 'axios';
import { RFC3339Date } from '../globalTypes';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateTransfer
 */
export async function updateTransfer(
	senseBoxId: string,
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

export type UpdateTransferResult = {
	message: 'Transfer successfully updated';
	data: BoxTransferInformation;
};

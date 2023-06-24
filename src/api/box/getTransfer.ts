import axios from 'axios';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getTransfer
 */
export async function getTransfer(senseBoxId: string, authorization: string): Promise<GetTransferResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

export type GetTransferResult = {
	data: BoxTransferInformation;
};

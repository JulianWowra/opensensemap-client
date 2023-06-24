import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-removeTransfer
 */
export async function removeTransfer(senseBoxId: string, transferToken: string, authorization: string): Promise<RemoveTransferResult> {
	return (
		await axios.delete('https://api.opensensemap.org/boxes/transfer', {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				boxId: senseBoxId,
				token: transferToken
			}
		})
	).data;
}

export type RemoveTransferResult = string;

import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-claimBox
 */
export async function claimBox(transferToken: string, authorization: string): Promise<ClaimBoxResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/boxes/claim',
			{
				token: transferToken
			},
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type ClaimBoxResult = {
	message: 'Device successfully claimed!';
};

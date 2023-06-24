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

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L602
 */
export type ClaimBoxResult = {
	message: 'Device successfully claimed!';
};

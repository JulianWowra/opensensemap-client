import axios from 'axios';
import { BoxDataWithSecrets } from '../box/_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBoxes
 */
export async function getUserBoxes(authorization: string): Promise<GetUserBoxesResult> {
	return (
		await axios.get('https://api.opensensemap.org/users/me/boxes', {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L257
 */
export type GetUserBoxesResult = {
	code: 'Ok';
	data: {
		boxes: BoxDataWithSecrets[];
		sharedBoxes: BoxDataWithSecrets[];
	};
};

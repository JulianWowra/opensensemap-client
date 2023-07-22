import axios from 'axios';
import { BoxDataWithSecrets } from '../box/_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBoxes
 */
export async function getUserBoxes(authorization: string, options?: GetUserBoxesOptions): Promise<GetUserBoxesResult> {
	return (
		await axios.get('https://api.opensensemap.org/users/me/boxes', {
			params: options,
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

export type GetUserBoxesOptions = {
	page?: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/api/lib/controllers/usersController.js#L259
 */
export type GetUserBoxesResult = {
	code: 'Ok';
	data: {
		boxes: BoxDataWithSecrets[];
		boxes_count: number;
		sharedBoxes: BoxDataWithSecrets[];
	};
};

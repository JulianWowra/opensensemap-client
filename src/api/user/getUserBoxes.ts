import axios from 'axios';
import { BoxData } from '../box/_boxModels';

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

export type GetUserBoxesResult = {
	code: 'Ok';
	data: {
		boxes: BoxData[];
		sharedBoxes: BoxData[];
	};
};

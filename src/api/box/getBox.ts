import axios from 'axios';
import { BoxData } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: string): Promise<GetBoxResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			params: {
				format: 'json'
			}
		})
	).data;
}

export type GetBoxResult = BoxData;

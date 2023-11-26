import axios from 'axios';
import { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-deleteBox
 */
export async function deleteBox(senseBoxId: OpenSenseMapID, password: string, authorization: string): Promise<DeleteBoxResult> {
	return (
		await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				password
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L491C4-L491C4
 */
export type DeleteBoxResult = {
	code: 'Ok';
	message: 'box and all associated measurements marked for deletion';
};

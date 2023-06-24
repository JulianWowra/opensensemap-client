import axios from 'axios';
import { OpenSenseMapID } from '../globalTypes';
import { BoxData } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: OpenSenseMapID): Promise<GetBoxResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			params: {
				format: 'json'
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L373
 */
export type GetBoxResult = BoxData;

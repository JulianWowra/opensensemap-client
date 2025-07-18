import axios from 'axios';
import { mask } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';
import { BOX_DATA } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: OpenSenseMapID) {
	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
		params: {
			format: 'json'
		}
	});

	return mask(response.data, GET_BOX_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L373|OpenSenseMap API code reference on GitHub}
 */
const GET_BOX_RESULT = BOX_DATA;

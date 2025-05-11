import axios from 'axios';
import { literal, mask } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurements
 */
export async function postNewMeasurements(senseBoxId: OpenSenseMapID, data: PostNewMeasurementsParamData, boxAuthorization?: string) {
	data = data.map((element) => {
		if (typeof element.value === 'number') {
			element.value = element.value.toString();
		}

		if (element.createdAt && element.createdAt instanceof Date) {
			element.createdAt = element.createdAt.toISOString();
		}

		return element;
	});

	const response = await axios.post(`https://api.opensensemap.org/boxes/${senseBoxId}/data`, data, {
		headers: boxAuthorization ? { Authorization: boxAuthorization } : {}
	});

	return mask(response.data, POST_NEW_MEASUREMENTS_RESULT);
}

export type PostNewMeasurementsParamData = {
	sensor: OpenSenseMapID;
	value: string | number;
	createdAt?: DateRFC3339 | Date;
	location?: Location;
}[];

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L425
 */
const POST_NEW_MEASUREMENTS_RESULT = literal('Measurements saved in box');

import axios from 'axios';
import { OpenSenseMapID, RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurements
 */
export async function postNewMeasurements(
	senseBoxId: OpenSenseMapID,
	data: PostNewMeasurementsParamData,
	boxAuthorization?: string
): Promise<PostNewMeasurementsResult> {
	data = data.map((element) => {
		if (typeof element.value === 'number') {
			element.value = element.value.toString();
		}

		if (element.createdAt && element.createdAt instanceof Date) {
			element.createdAt = element.createdAt.toISOString();
		}

		return element;
	});

	return (
		await axios.post(`https://api.opensensemap.org/boxes/${senseBoxId}/data`, data, {
			headers: boxAuthorization ? { Authorization: boxAuthorization } : {}
		})
	).data;
}

export type PostNewMeasurementsParamData = {
	sensor: OpenSenseMapID;
	value: string | number;
	createdAt?: RFC3339Date | Date;
	location?: Location;
}[];

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L425
 */
export type PostNewMeasurementsResult = 'Measurements saved in box';

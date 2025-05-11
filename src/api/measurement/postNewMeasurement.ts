import axios from 'axios';
import { literal, mask } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurement
 */
export async function postNewMeasurement(
	senseBoxId: OpenSenseMapID,
	sensorId: OpenSenseMapID,
	value: string | number,
	boxAuthorization?: string,
	options?: PostNewMeasurementOptions
) {
	if (options?.createdAt && options.createdAt instanceof Date) {
		options.createdAt = options.createdAt.toISOString();
	}

	const response = await axios.post(
		`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}`,
		Object.assign(
			{
				value: typeof value === 'string' ? value : value.toString()
			},
			options
		),
		{
			headers: boxAuthorization ? { Authorization: boxAuthorization } : {}
		}
	);

	return mask(response.data, POST_NEW_MEASUREMENT_RESULT);
}

export type PostNewMeasurementOptions = {
	createdAt?: DateRFC3339 | Date;
	location?: Location;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L315
 */
const POST_NEW_MEASUREMENT_RESULT = literal('Measurement saved in box');

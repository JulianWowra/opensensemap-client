import axios from 'axios';
import { OpenSenseMapID, RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurement
 */
export async function postNewMeasurement(
	senseBoxId: OpenSenseMapID,
	sensorId: OpenSenseMapID,
	value: string | number,
	boxAuthorization?: string,
	options?: PostNewMeasurementOptions
): Promise<PostNewMeasurementResult> {
	if (options?.createdAt && options.createdAt instanceof Date) {
		options.createdAt = options.createdAt.toISOString();
	}

	return (
		await axios.post(
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
		)
	).data;
}

export type PostNewMeasurementOptions = {
	createdAt?: RFC3339Date | Date;
	location?: Location;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L315
 */
export type PostNewMeasurementResult = 'Measurement saved in box';

import axios from 'axios';
import { RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurement
 */
export async function postNewMeasurement(
	senseBoxId: string,
	sensorId: string,
	value: string | number,
	authorization?: string,
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
				headers: authorization ? { Authorization: authorization } : {}
			}
		)
	).data;
}

export type PostNewMeasurementOptions = {
	createdAt?: RFC3339Date | Date;
	location?: Location;
};

export type PostNewMeasurementResult = 'Measurement saved in box';

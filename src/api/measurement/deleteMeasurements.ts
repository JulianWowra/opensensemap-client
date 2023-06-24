import axios from 'axios';
import { RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-deleteMeasurements
 */
export async function deleteMeasurements(
	senseBoxId: string,
	sensorId: string,
	authorization: string,
	options?: DeleteMeasurementsOptions
): Promise<DeleteMeasurementsResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options && Array.isArray(options.timestamps)) {
		options.timestamps = options.timestamps.map((element) => {
			if (element instanceof Date) {
				return element.toISOString();
			}

			return element;
		});
	}

	return (
		await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}/measurements`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: options
		})
	).data;
}

export type DeleteMeasurementsOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	timestamps?: Array<RFC3339Date | Date>;
	deleteAllMeasurements?: boolean;
};

export type DeleteMeasurementsResult = {
	code: 'Ok';
	message: string;
};

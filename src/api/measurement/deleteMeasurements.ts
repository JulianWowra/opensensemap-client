import axios from 'axios';
import { type Infer, literal, mask, object, pattern, string } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-deleteMeasurements
 */
export async function deleteMeasurements(
	senseBoxId: OpenSenseMapID,
	sensorId: OpenSenseMapID,
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

	const response = await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}/measurements`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: options
	});

	return mask(response.data, DELETE_MEASUREMENTS_RESULT);
}

export type DeleteMeasurementsOptions = {
	'from-date'?: DateRFC3339 | Date;
	'to-date'?: DateRFC3339 | Date;
	timestamps?: Array<DateRFC3339 | Date>;
	deleteAllMeasurements?: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/sensorsController.js#L47
 */
const DELETE_MEASUREMENTS_RESULT = object({
	code: literal('Ok'),
	message: pattern(string(), /^Successfully deleted (all measurements|\d+ measurements|measurements between .+ and .+) of sensor .+$/)
});

export type DeleteMeasurementsResult = Infer<typeof DELETE_MEASUREMENTS_RESULT>;

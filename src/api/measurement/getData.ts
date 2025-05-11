import axios from 'axios';
import { array, boolean, mask, object, optional, string } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';
import { COORDINATES, DATE_RFC3339 } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getData
 */
export async function getData(senseBoxId: OpenSenseMapID, sensorId: OpenSenseMapID, options?: GetDataOptions) {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`, {
		params: options
	});

	return mask(response.data, GET_DATA_RESULT);
}

export type GetDataOptions = {
	'from-date'?: DateRFC3339 | Date;
	'to-date'?: DateRFC3339 | Date;
	outliers?: 'replace' | 'mark';
	'outlier-window'?: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L154C4-L154C4
 */
const GET_DATA_RESULT = array(
	object({
		value: string(),
		location: COORDINATES,
		createdAt: DATE_RFC3339,
		isOutlier: optional(boolean())
	})
);

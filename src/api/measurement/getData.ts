import axios from 'axios';
import { Coordinates, OpenSenseMapID, RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getData
 */
export async function getData(senseBoxId: OpenSenseMapID, sensorId: OpenSenseMapID, options?: GetDataOptions): Promise<GetDataResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`, {
			params: options
		})
	).data;
}

export type GetDataOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	outliers?: 'replace' | 'mark';
	'outlier-window'?: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L154C4-L154C4
 */
export type GetDataResult = {
	value: string;
	location: Coordinates;
	createdAt: RFC3339Date;
	isOutlier?: boolean;
}[];

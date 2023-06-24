import axios from 'axios';
import { RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getData
 */
export async function getData(senseBoxId: string, sensorId: string, options?: GetDataOptions): Promise<GetDataResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`, {
			params: Object.assign({ format: 'json' }, options)
		})
	).data;
}

export type GetDataOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	outliers?: 'replace' | 'mark';
	'outlier-window'?: number;
};

export type GetDataResult = {
	value: string;
	location: Location;
	createdAt: RFC3339Date;
}[];

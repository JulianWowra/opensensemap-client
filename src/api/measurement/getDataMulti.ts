import axios from 'axios';
import { AdvancedColumns, Exposure, RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataMulti
 */
export async function getDataMulti(
	boxId: string[] | undefined,
	bbox: string | undefined,
	phenomenon: string,
	options?: GetDataMultiOptions
): Promise<GetDataMultiResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options?.columns && Array.isArray(options.columns)) {
		options.columns = options.columns.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	return (
		await axios.get('https://api.opensensemap.org/boxes/data', {
			params: Object.assign(
				{
					format: 'json',
					boxId: boxId?.join(),
					bbox,
					phenomenon
				},
				options
			)
		})
	).data;
}

export type GetDataMultiOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	columns?: string | AdvancedColumns[];
	exposure?: string | Exposure[];
};

export type GetDataMultiResult = {
	createdAt: RFC3339Date;
	value: string;
	sensorId: string;
	lat: number;
	lon: number;
}[];

import axios from 'axios';
import { Columns, Exposure } from '../box/_boxModels';
import { OpenSenseMapID, RFC3339Date, WGS84Coordinates } from '../globalTypes';
import { Operation } from './_statisticModels';

/**
 * @see https://docs.opensensemap.org/#api-Statistics-descriptive
 */
export async function descriptive(
	target: DescriptiveParamTarget,
	phenomenon: string,
	fromDate: RFC3339Date | Date,
	toDate: RFC3339Date | Date,
	operation: Operation,
	window: string,
	options?: DescriptiveOptions
): Promise<DescriptiveResult> {
	if ('boxId' in target && Array.isArray(target.boxId)) {
		target.boxId = target.boxId.join();
	}

	if (fromDate instanceof Date) {
		fromDate = fromDate.toISOString();
	}

	if (toDate instanceof Date) {
		toDate = toDate.toISOString();
	}

	if (options?.columns && Array.isArray(options.columns)) {
		options.columns = options.columns.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	return (
		await axios.get('https://api.opensensemap.org/statistics/descriptive', {
			params: Object.assign(
				{
					phenomenon,
					'from-date': fromDate,
					'to-date': toDate,
					operation,
					window,
					format: 'json'
				},
				target,
				options
			)
		})
	).data;
}

export type DescriptiveParamTarget =
	| {
			boxId: OpenSenseMapID | OpenSenseMapID[];
	  }
	| {
			bbox: WGS84Coordinates;
	  };

export type DescriptiveOptions = {
	columns?: string | Columns[];
	exposure?: string | Exposure[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L325
 */
export type DescriptiveResult = {
	sensorId: OpenSenseMapID;
} & Record<Columns, string | undefined> &
	Record<RFC3339Date, number>[];

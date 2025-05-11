import axios from 'axios';
import { array, type Infer, intersection, mask, number, object, optional, record, string } from 'superstruct';
import { type Columns, COLUMNS, type ExposureType } from '../box/_boxModels';
import { type CoordinatesWGS84, DATE_RFC3339, type DateRFC3339, OPENSENSEMAP_ID, type OpenSenseMapID } from '../globalTypes';
import type { Operation } from './_statisticModels';

/**
 * @see https://docs.opensensemap.org/#api-Statistics-descriptive
 */
export async function descriptive(
	target: DescriptiveParamTarget,
	phenomenon: string,
	fromDate: DateRFC3339 | Date,
	toDate: DateRFC3339 | Date,
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

	const response = await axios.get('https://api.opensensemap.org/statistics/descriptive', {
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
	});

	return mask(response.data, DESCRIPTIVE_RESULT);
}

export type DescriptiveParamTarget =
	| {
			boxId: OpenSenseMapID | OpenSenseMapID[];
	  }
	| {
			bbox: CoordinatesWGS84;
	  };

export type DescriptiveOptions = {
	columns?: string | Columns[];
	exposure?: string | ExposureType[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L325
 */
const DESCRIPTIVE_RESULT = array(
	intersection([
		object({
			sensorId: OPENSENSEMAP_ID
		}),
		record(COLUMNS, optional(string())),
		record(DATE_RFC3339, number())
	])
);

export type DescriptiveResult = Infer<typeof DESCRIPTIVE_RESULT>;

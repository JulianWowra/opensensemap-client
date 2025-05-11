import axios from 'axios';
import { array, type Infer, intersection, mask, object, optional, record, string } from 'superstruct';
import { type Columns, COLUMNS, type ExposureType } from '../box/_boxModels';
import { type CoordinatesWGS84, DATE_RFC3339, type DateRFC3339, type OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataMulti
 */
export async function getDataMulti(
	phenomenon: string,
	target: GetDataMultiParamTarget,
	options?: GetDataMultiOptions
): Promise<GetDataMultiResult> {
	if ('boxId' in target && Array.isArray(target.boxId)) {
		target.boxId = target.boxId.join();
	}

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

	const response = await axios.get('https://api.opensensemap.org/boxes/data', {
		params: Object.assign(
			{
				format: 'json',
				phenomenon
			},
			target,
			options
		)
	});

	return mask(response.data, GET_DATA_MULTI_RESULT);
}

export type GetDataMultiParamTarget =
	| {
			boxId: OpenSenseMapID | OpenSenseMapID[];
	  }
	| {
			bbox: CoordinatesWGS84;
	  };

export type GetDataMultiOptions = {
	'from-date'?: DateRFC3339 | Date;
	'to-date'?: DateRFC3339 | Date;
	columns?: string | Columns[];
	exposure?: string | ExposureType[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L239
 */
const GET_DATA_MULTI_RESULT = array(
	intersection([
		object({
			createdAt: DATE_RFC3339,
			value: string()
		}),
		record(COLUMNS, optional(string()))
	])
);

export type GetDataMultiResult = Infer<typeof GET_DATA_MULTI_RESULT>;

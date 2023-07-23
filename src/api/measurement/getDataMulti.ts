import axios from 'axios';
import { Columns, Exposure } from '../box/_boxModels';
import { OpenSenseMapID, RFC3339Date, WGS84Coordinates } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataMulti
 * @param {GetDataMultiParamTarget} target is a object with information of `boxId` or array of `boxId` or `bbox` string
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

	return (
		await axios.get('https://api.opensensemap.org/boxes/data', {
			params: Object.assign(
				{
					format: 'json',
					phenomenon
				},
				target,
				options
			)
		})
	).data;
}

export type GetDataMultiParamTarget =
	| {
			boxId: OpenSenseMapID | OpenSenseMapID[];
	  }
	| {
			bbox: WGS84Coordinates;
	  };

export type GetDataMultiOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	columns?: string | Columns[];
	exposure?: string | Exposure[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L239
 */
export type GetDataMultiResult = {
	createdAt: string;
	value: string;
} & Record<Columns, string | undefined>[];

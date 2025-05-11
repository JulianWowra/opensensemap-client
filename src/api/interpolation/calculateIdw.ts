import axios from 'axios';
import { array, type Infer, literal, mask, number, object, optional, string, union } from 'superstruct';
import type { ExposureType } from '../box/_boxModels';
import { type CoordinatesWGS84, DATE_RFC3339, type DateRFC3339 } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Interpolation-calculateIdw
 */
export async function calculateIdw(phenomenon: string, bbox: CoordinatesWGS84, options?: CalculateIdwOptions): Promise<CalculateIdwResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const response = await axios.get('https://api.opensensemap.org/statistics/idw', {
		params: Object.assign({ phenomenon, bbox }, options)
	});

	return mask(response.data, CALCULATE_IDW_RESULT);
}

export type CalculateIdwOptions = {
	'from-date'?: DateRFC3339 | Date;
	'to-date'?: DateRFC3339 | Date;
	gridType?: 'hex' | 'square' | 'triangle';
	cellWidth?: number;
	power?: number;
	numTimeSteps?: number;
	numClasses?: number;
	exposure?: string | ExposureType[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L112C7-L112C7
 */
const CALCULATE_IDW_RESULT = union([
	object({
		code: literal('NotFound'),
		message: literal('no measurements found')
	}),
	object({
		code: literal('Ok'),
		data: object({
			breaks: array(number()),
			featureCollection: array(
				object({
					type: literal('FeatureCollection'),
					features: object({
						type: string(),
						properties: optional(
							object({
								idwValues: array(number())
							})
						),
						geometry: object({
							type: string(),
							coordinates: array(array(array(number())))
						})
					})
				})
			),
			timesteps: array(DATE_RFC3339)
		})
	})
]);

export type CalculateIdwResult = Infer<typeof CALCULATE_IDW_RESULT>;

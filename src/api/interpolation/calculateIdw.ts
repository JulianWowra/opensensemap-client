import axios from 'axios';
import { Exposure } from '../box/_boxModels';
import { RFC3339Date, WGS84Coordinates } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Interpolation-calculateIdw
 */
export async function calculateIdw(phenomenon: string, bbox: WGS84Coordinates, options?: CalculateIdwOptions): Promise<CalculateIdwResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	return (
		await axios.get('https://api.opensensemap.org/statistics/idw', {
			params: Object.assign({ phenomenon, bbox }, options)
		})
	).data;
}

export type CalculateIdwOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	gridType?: 'hex' | 'square' | 'triangle';
	cellWidth?: number;
	power?: number;
	numTimeSteps?: number;
	numClasses?: number;
	exposure?: string | Exposure[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L112C7-L112C7
 */
export type CalculateIdwResult =
	| {
			code: 'NotFound';
			message: 'no measurements found';
	  }
	| {
			code: 'Ok';
			data: {
				breaks: number[];
				featureCollection: {
					type: 'FeatureCollection';
					features: {
						type: string;
						properties?: {
							idwValues: number[];
						};
						geometry: {
							type: string;
							coordinates: number[][][];
						};
					};
				}[];
				timesteps: RFC3339Date[];
			};
	  };

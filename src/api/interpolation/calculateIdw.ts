import axios from 'axios';
import { Exposure, RFC3339Date } from '../globalTypes';
import { CalculatedIdw } from './_interpolationModels';

/**
 * @see https://docs.opensensemap.org/#api-Interpolation-calculateIdw
 */
export async function calculateIdw(phenomenon: string, bbox: string, options?: CalculateIdwOptions): Promise<CalculateIdwResult> {
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

export type CalculateIdwResult =
	| {
			code: 'NotFound';
			message: 'no measurements found';
	  }
	| CalculatedIdw;

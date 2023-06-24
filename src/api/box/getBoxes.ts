import axios from 'axios';
import { Exposure, Model, RFC3339Date } from '../globalTypes';
import { BoxData } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(bbox: string, options?: GetBoxesOptions): Promise<GetBoxesResult> {
	if (options?.date && options.date instanceof Date) {
		options.date = options.date.toISOString();
	}

	if (options?.grouptag && Array.isArray(options.grouptag)) {
		options.grouptag = options.grouptag.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	return (
		await axios.get('https://api.opensensemap.org/boxes', {
			params: Object.assign(
				{
					format: 'json',
					bbox
				},
				options
			)
		})
	).data;
}

export type GetBoxesOptions = {
	date?: RFC3339Date | Date;
	phenomenon?: string;
	grouptag?: string | string[];
	model?: Model;
	classify?: boolean;
	minimal?: boolean;
	full?: boolean;
	near?: string;
	maxDistance?: number;
	exposure?: string | Exposure[];
};

export type GetBoxesResult = BoxData[];

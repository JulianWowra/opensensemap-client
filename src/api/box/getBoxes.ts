import axios from 'axios';
import { RFC3339Date, WGS84Coordinates } from '../globalTypes';
import { BoxData, BoxModel, Exposure } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(bbox: WGS84Coordinates, options?: GetBoxesOptions): Promise<GetBoxesResult> {
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
	model?: BoxModel;
	classify?: boolean;
	minimal?: boolean;
	full?: boolean;
	near?: string;
	maxDistance?: number;
	exposure?: string | Exposure[];
};

export type GetBoxesResult = BoxData[];

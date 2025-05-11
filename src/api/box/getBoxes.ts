import axios from 'axios';
import { array, mask } from 'superstruct';
import type { CoordinatesWGS84, DateRFC3339 } from '../globalTypes';
import { BOX_DATA, type BoxModel, type ExposureType } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(bbox: CoordinatesWGS84, options?: GetBoxesOptions) {
	if (options?.date && options.date instanceof Date) {
		options.date = options.date.toISOString();
	}

	if (options?.grouptag && Array.isArray(options.grouptag)) {
		options.grouptag = options.grouptag.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const response = await axios.get('https://api.opensensemap.org/boxes', {
		params: Object.assign(
			{
				bbox
			},
			options
		)
	});

	return mask(response.data, GET_BOXES_RESULT);
}

export type GetBoxesOptions = {
	date?: DateRFC3339 | Date;
	phenomenon?: string;
	grouptag?: string | string[];
	model?: BoxModel;
	classify?: boolean;
	minimal?: boolean;
	full?: boolean;
	near?: string;
	maxDistance?: number;
	exposure?: string | ExposureType[];
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L253
 */
const GET_BOXES_RESULT = array(BOX_DATA);

import axios from 'axios';
import { array, type Infer, mask } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';
import { BOX_LOCATION } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxLocations
 */
export async function getBoxLocations(senseBoxId: OpenSenseMapID, options?: GetBoxLocationsOptions): Promise<GetBoxLocationsResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/locations`, {
		params: options
	});

	return mask(response.data, GET_BOX_LOCATIONS_RESULT);
}

export type GetBoxLocationsOptions = {
	'from-date': DateRFC3339 | Date;
	'to-date': DateRFC3339 | Date;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L173C3-L173C3
 */
const GET_BOX_LOCATIONS_RESULT = array(BOX_LOCATION);
export type GetBoxLocationsResult = Infer<typeof GET_BOX_LOCATIONS_RESULT>;

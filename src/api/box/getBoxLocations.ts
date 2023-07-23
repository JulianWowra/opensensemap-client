import axios from 'axios';
import { OpenSenseMapID, RFC3339Date } from '../globalTypes';
import { BoxLocation } from './_boxModels';

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

	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/locations`, {
			params: options
		})
	).data;
}

export type GetBoxLocationsOptions = {
	'from-date': RFC3339Date | Date;
	'to-date': RFC3339Date | Date;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L173C3-L173C3
 */
export type GetBoxLocationsResult = BoxLocation[];

import axios from 'axios';
import { RFC3339Date } from '../globalTypes';
import { BoxCurrentLocation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxLocations
 */
export async function getBoxLocations(senseBoxId: string, options?: GetBoxLocationsOptions): Promise<GetBoxLocationsResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/locations`, {
			params: Object.assign(
				{
					format: 'json'
				},
				options
			)
		})
	).data;
}

export type GetBoxLocationsOptions = {
	'from-date': RFC3339Date | Date;
	'to-date': RFC3339Date | Date;
};

export type GetBoxLocationsResult = BoxCurrentLocation[];

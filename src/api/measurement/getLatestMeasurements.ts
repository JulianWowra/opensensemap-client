import axios from 'axios';
import { array, type Infer, mask, object, optional, string } from 'superstruct';
import { OPENSENSEMAP_ID, type OpenSenseMapID } from '../globalTypes';
import { LATEST_MEASUREMENT_SENSOR } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements
 */
export default async function getLatestMeasurements(
	senseBoxId: OpenSenseMapID,
	options?: GetLatestMeasurementsOptions
): Promise<GetLatestMeasurementsResult> {
	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors`, { params: options });
	return mask(response.data, GET_LATEST_MEASUREMENTS_RESULT);
}

export type GetLatestMeasurementsOptions = {
	count: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L93
 */
const GET_LATEST_MEASUREMENTS_RESULT = object({
	_id: OPENSENSEMAP_ID,
	name: optional(string()),
	sensors: array(LATEST_MEASUREMENT_SENSOR),
	grouptag: optional(string())
});

export type GetLatestMeasurementsResult = Infer<typeof GET_LATEST_MEASUREMENTS_RESULT>;

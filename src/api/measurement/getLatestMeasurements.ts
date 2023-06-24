import axios from 'axios';
import { Sensor } from '../box/_boxModels';
import { OpenSenseMapID } from '../globalTypes';
import { GetLatestMeasurement, LastMeasurement } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements
 */
export default async function getLatestMeasurements(
	senseBoxId: OpenSenseMapID,
	options?: GetLatestMeasurementsOptions
): Promise<GetLatestMeasurementsResult> {
	return (await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors`, { params: options })).data;
}

export type GetLatestMeasurementsOptions = {
	count: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L93
 */
export type GetLatestMeasurementsResult = {
	_id: OpenSenseMapID;
	name?: string;
	sensors: GetLatestMeasurement[] | Sensor<LastMeasurement>[];
	grouptag?: string;
};

import axios from 'axios';
import { mask, optional, string, union } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';
import { LATEST_MEASUREMENT_SENSOR } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor
 */
export async function getLatestMeasurementOfSensor(
	senseBoxId: OpenSenseMapID,
	sensorId: OpenSenseMapID,
	options?: GetLatestMeasurementOfSensorOptions
) {
	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors/${sensorId}`, { params: options });
	return mask(response.data, GET_LATEST_MEASUREMENT_OF_SENSOR_RESULT);
}

export type GetLatestMeasurementOfSensorOptions = {
	onlyValue?: boolean;
};

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L82C48-L82C48|OpenSenseMap API code reference on GitHub}
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L86|OpenSenseMap API code reference on GitHub}
 */
const GET_LATEST_MEASUREMENT_OF_SENSOR_RESULT = optional(union([LATEST_MEASUREMENT_SENSOR, string()]));

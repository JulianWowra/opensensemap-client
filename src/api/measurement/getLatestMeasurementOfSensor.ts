import axios from 'axios';
import { OpenSenseMapID } from '../globalTypes';
import { GetLatestMeasurement } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor
 */
export async function getLatestMeasurementOfSensor(
	senseBoxId: OpenSenseMapID,
	sensorId: OpenSenseMapID,
	options?: GetLatestMeasurementOfSensorOptions
): Promise<GetLatestMeasurementOfSensorResult> {
	return (await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors/${sensorId}`, { params: options })).data;
}

export type GetLatestMeasurementOfSensorOptions = {
	onlyValue?: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L82C48-L82C48
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L86
 */
export type GetLatestMeasurementOfSensorResult = GetLatestMeasurement | string | undefined;

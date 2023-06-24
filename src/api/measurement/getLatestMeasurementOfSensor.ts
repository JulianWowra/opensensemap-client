import axios from 'axios';
import { GetLatestMeasurement } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor
 */
export async function getLatestMeasurementOfSensor(
	senseBoxId: string,
	sensorId: string,
	options?: GetLatestMeasurementOfSensorOptions
): Promise<GetLatestMeasurementOfSensorResult> {
	return (await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors/${sensorId}`, { params: options })).data;
}

export type GetLatestMeasurementOfSensorOptions = {
	onlyValue?: boolean;
};

export type GetLatestMeasurementOfSensorResult = GetLatestMeasurement | string;

import axios from 'axios';
import { GetLatestMeasurement } from './_measurementModels';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements
 */
export async function getLatestMeasurements(
	senseBoxId: string,
	options?: GetLatestMeasurementsOptions
): Promise<GetLatestMeasurementsResult> {
	return (await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors`, { params: options })).data;
}

export type GetLatestMeasurementsOptions = {
	count: number;
};

export type GetLatestMeasurementsResult = {
	_id: string;
	sensors: GetLatestMeasurement[];
};

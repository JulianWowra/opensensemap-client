import axios from 'axios';
import { RFC3339Date } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurements
 */
export async function postNewMeasurements(
	senseBoxId: string,
	data: PostNewMeasurementsData,
	authorization?: string
): Promise<PostNewMeasurementsResult> {
	data = data.map((element) => {
		if (typeof element.value === 'number') {
			element.value = element.value.toString();
		}

		if (element.createdAt && element.createdAt instanceof Date) {
			element.createdAt = element.createdAt.toISOString();
		}

		return element;
	});

	return (
		await axios.post(`https://api.opensensemap.org/boxes/${senseBoxId}/data`, data, {
			headers: authorization ? { Authorization: authorization } : {}
		})
	).data;
}

export type PostNewMeasurementsData = {
	sensor: string;
	value: string | number;
	createdAt?: RFC3339Date | Date;
	location?: Location;
}[];

export type PostNewMeasurementsResult = 'Measurements saved in box';

import { RFC3339Date } from '../globalTypes';

//
// https://docs.opensensemap.org/#api-Measurements
//

export interface GetLatestMeasurement {
	_id: string;
	icon: string;
	sensorType: string;
	unit: string;
	title: string;
	lastMeasurement: {
		value: string;
		createdAt: RFC3339Date;
	};
}

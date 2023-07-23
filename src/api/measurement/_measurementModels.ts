import { Coordinates, OpenSenseMapID, RFC3339Date } from '../globalTypes';

//
// https://docs.opensensemap.org/#api-Measurements
//

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L155C4-L155C4
 */
export type LastMeasurement = {
	value: string;
	createdAt: RFC3339Date;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L8
 */
export type Measurement = {
	_id: OpenSenseMapID;
	value: string;
	sensor_id: OpenSenseMapID;
	createdAt: RFC3339Date;
	location: {
		type: 'Point';
		coordinates: Coordinates;
	};
};

export type GetLatestMeasurement = {
	_id: OpenSenseMapID;
	icon?: string;
	sensorType: string;
	unit: string;
	title: string;
	lastMeasurement?: {
		value: string;
		createdAt: RFC3339Date;
	};
};

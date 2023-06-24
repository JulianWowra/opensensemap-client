import { Exposure, Location, MQTT, RFC3339Date, TTN } from '../globalTypes';

export interface BoxData {
	_id: string;
	name: string;
	createdAt: RFC3339Date;
	exposure: Exposure;
	model: string;
	description?: string;
	grouptag?: string[];
	weblink?: string;
	image?: string;
	currentLocation: BoxCurrentLocation;
	updatedAt: RFC3339Date;
	sensors: BoxSensors[];
	loc: {
		geometry: {
			timestamp: RFC3339Date;
			coordinates: Location;
			type: string;
		};
		type: string;
	}[];
	lastMeasurementAt?: RFC3339Date;
	integrations: { mqtt: MQTT | { enabled: false }; ttn?: TTN };
	access_token?: string;
	useAuth?: boolean;
}

export interface BoxSensors {
	_id: string;
	title: string;
	unit: string;
	sensorType: string;
	icon?: string;
	lastMeasurement?: LastMeasurement;
}

export interface LastMeasurement {
	value: string;
	createdAt: RFC3339Date;
}

export interface BoxCurrentLocation {
	coordinates: Location;
	type: string;
	timestamp: RFC3339Date;
}

export interface BoxTransferInformation {
	_id: string;
	boxId: string;
	token: string;
	createdAt: RFC3339Date;
	updatedAt: RFC3339Date;
	expiresAt: RFC3339Date;
}

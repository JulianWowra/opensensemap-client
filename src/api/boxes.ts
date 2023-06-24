import axios from 'axios';
import {
	Exposure,
	Location,
	Model,
	MQTT,
	RFC3339Date,
	Sensor,
	SensorDeleted,
	SensorEdited,
	SensorNew,
	SensorTemplates,
	TTN
} from './types';

//
// https://docs.opensensemap.org/#api-Boxes
//

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: string): Promise<GetBoxResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			params: {
				format: 'json'
			}
		})
	).data;
}

export type GetBoxResult = BoxData;

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(bbox: string, options?: GetBoxesOptions): Promise<GetBoxesResult> {
	if (options?.date && options.date instanceof Date) {
		options.date = options.date.toISOString();
	}

	if (options?.grouptag && Array.isArray(options.grouptag)) {
		options.grouptag = options.grouptag.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	return (
		await axios.get('https://api.opensensemap.org/boxes', {
			params: Object.assign(
				{
					format: 'json',
					bbox
				},
				options
			)
		})
	).data;
}

export type GetBoxesOptions = {
	date?: RFC3339Date | Date;
	phenomenon?: string;
	grouptag?: string | string[];
	model?: Model;
	classify?: boolean;
	minimal?: boolean;
	full?: boolean;
	near?: string;
	maxDistance?: number;
	exposure?: string | Exposure[];
};

export type GetBoxesResult = BoxData[];

/**
 * @see https://docs.opensensemap.org/#api-Boxes-postNewBox
 */
export async function postNewBox(
	name: string,
	exposure: Exposure,
	location: Location,
	authorization: string,
	options?: PostNewBoxOptions
): Promise<PostNewBoxResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/boxes',
			Object.assign(
				{
					name,
					exposure,
					location
				},
				options
			),
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type PostNewBoxOptions = {
	grouptag?: string;
	model?: Model;
	sensors?: Sensor[];
	sensorTemplates?: SensorTemplates[];
	mqtt?: MQTT;
	ttn?: TTN;
	useAuth?: boolean;
	sharedBox?: boolean;
};

export type PostNewBoxResult = {
	message: 'Box successfully created';
	data: BoxData;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 */
export async function updateBox(senseBoxId: string, authorization: string, options: UpdateBoxOptions): Promise<UpdateBoxResult> {
	return (
		await axios.put(`https://api.opensensemap.org/boxes/${senseBoxId}`, options, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

export type UpdateBoxOptions = {
	name?: string;
	grouptag?: string[];
	location?: Location;
	sensors?: (SensorEdited | SensorNew | SensorDeleted)[];
	mqtt?: MQTT;
	ttn?: TTN;
	description?: string;
	image?: string;
	addons?: Record<string | number, string | number>;
};

export type UpdateBoxResult = {
	code: 'Ok';
	data: BoxData;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-deleteBox
 */
export async function deleteBox(senseBoxId: string, authorization: string, password: string): Promise<DeleteBoxResult> {
	return (
		await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				password
			}
		})
	).data;
}

export type DeleteBoxResult = {
	code: 'Ok';
	message: 'box and all associated measurements marked for deletion';
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-claimBox
 */
export async function claimBox(transferToken: string, authorization: string): Promise<ClaimBoxResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/boxes/claim',
			{
				token: transferToken
			},
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type ClaimBoxResult = {
	message: 'Device successfully claimed!';
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getSketch
 */
export async function getSketch(senseBoxId: string, authorization: string, options?: GetSketchOptions): Promise<GetSketchResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/script`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			params: options
		})
	).data;
}

export type GetSketchOptions = {
	serialPort?: 'Serial1' | 'Serial2';
	soilDigitalPort?: 'A' | 'B' | 'C';
	soundMeterPort?: 'A' | 'B' | 'C';
	windSpeedPort?: 'A' | 'B' | 'C';
	ssid?: string;
	password?: string;
	devEUI?: string;
	appEUI?: string;
	appKey?: string;
	display_enabled?: boolean;
};

export type GetSketchResult = string;

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxLocations
 */
export async function getBoxLocations(senseBoxId: string, options?: GetBoxLocationsOptions): Promise<GetBoxLocationsResult> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	return (
		await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/locations`, {
			params: Object.assign(
				{
					format: 'json'
				},
				options
			)
		})
	).data;
}

export type GetBoxLocationsOptions = {
	'from-date': RFC3339Date | Date;
	'to-date': RFC3339Date | Date;
};

export type GetBoxLocationsResult = BoxCurrentLocation[];

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getTransfer
 */
export async function getTransfer(senseBoxId: string, authorization: string): Promise<GetTransferResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

export type GetTransferResult = {
	data: BoxTransferInformation;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-createTransfer
 */
export async function createTransfer(senseBoxId: string, expiresAt: RFC3339Date, authorization: string): Promise<CreateTransferResult> {
	return (
		await axios.post(
			'https://api.opensensemap.org/boxes/transfer',
			{
				boxId: senseBoxId,
				date: expiresAt
			},
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type CreateTransferResult = {
	message: 'Box successfully prepared for transfer';
	data: BoxTransferInformation;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-removeTransfer
 */
export async function removeTransfer(senseBoxId: string, transferToken: string, authorization: string): Promise<RemoveTransferResult> {
	return (
		await axios.delete('https://api.opensensemap.org/boxes/transfer', {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				boxId: senseBoxId,
				token: transferToken
			}
		})
	).data;
}

export type RemoveTransferResult = string;

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateTransfer
 */
export async function updateTransfer(
	senseBoxId: string,
	transferToken: string,
	expiresAt: RFC3339Date,
	authorization: string
): Promise<UpdateTransferResult> {
	return (
		await axios.put(
			`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`,
			{
				token: transferToken,
				date: expiresAt
			},
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type UpdateTransferResult = {
	message: 'Transfer successfully updated';
	data: BoxTransferInformation;
};

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

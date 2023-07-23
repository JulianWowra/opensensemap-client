import axios from 'axios';
import { Coordinates } from '../globalTypes';
import { BoxDataWithSecrets, BoxModel, Exposure, MQTT, TTN } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-postNewBox
 */
export async function postNewBox(
	name: string,
	exposure: Exposure,
	location: Coordinates,
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
	model?: BoxModel;
	sensors?: PostNewBoxSensor[];
	sensorTemplates?: SensorTemplates[];
	mqtt?: MQTT;
	ttn?: TTN;
	useAuth?: boolean;
	sharedBox?: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L413
 */
export type PostNewBoxResult = {
	message: 'Box successfully created';
	data: BoxDataWithSecrets;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/sensor/sensor.js#L8
 */
export type PostNewBoxSensor = {
	title: string;
	unit: string;
	sensorType?: string;
	icon?: string;
};

export type SensorTemplates =
	| 'hdc1080'
	| 'bmp280'
	| 'tsl45315'
	| 'veml6070'
	| 'sds011'
	| 'bme680'
	| 'smt50'
	| 'soundlevelmeter'
	| 'windspeed'
	| 'scd30'
	| 'dps310'
	| 'sps30';

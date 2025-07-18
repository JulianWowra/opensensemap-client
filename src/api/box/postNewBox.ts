import axios from 'axios';
import { literal, mask, object } from 'superstruct';
import type { Coordinates } from '../globalTypes';
import type { BoxModel, ExposureType, MQTT, Sensor, SensorTemplates, TTN } from './_boxModels';
import { BOX_DATA_WITH_SECRETS } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-postNewBox
 */
export async function postNewBox(
	name: string,
	exposure: ExposureType,
	location: Coordinates,
	authorization: string,
	options?: PostNewBoxOptions
) {
	const reponse = await axios.post(
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
	);

	return mask(reponse.data, POST_NEW_BOX_RESULT);
}

export type PostNewBoxOptions = {
	description?: string;
	grouptag?: string;
	model?: BoxModel;
	sensors?: Omit<Sensor, '_id'>[];
	sensorTemplates?: SensorTemplates[];
	serialPort?: 'Serial1' | 'Serial2';
	soilDigitalPort?: 'A' | 'B' | 'C';
	soundMeterPort?: 'A' | 'B' | 'C';
	windSpeedPort?: 'A' | 'B' | 'C';
	mqtt?: MQTT;
	ttn?: TTN;
	useAuth?: boolean;
	sharedBox?: boolean;
};

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L413|OpenSenseMap API code reference on GitHub}
 */
const POST_NEW_BOX_RESULT = object({
	message: literal('Box successfully created'),
	data: BOX_DATA_WITH_SECRETS
});

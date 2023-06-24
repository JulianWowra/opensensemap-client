import axios from 'axios';
import { Exposure, MQTT, Model, Sensor, SensorTemplates, TTN } from '../globalTypes';
import { BoxData } from './_boxModels';

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

import axios from 'axios';
import { Location, MQTT, SensorDeleted, SensorEdited, SensorNew, TTN } from '../globalTypes';
import { BoxData } from './_boxModels';

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

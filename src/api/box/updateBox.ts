import axios from 'axios';
import { Coordinates, OpenSenseMapID } from '../globalTypes';
import { BoxDataWithSecrets, MQTT, TTN } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 */
export async function updateBox(senseBoxId: OpenSenseMapID, authorization: string, options: UpdateBoxOptions): Promise<UpdateBoxResult> {
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
	location?: Coordinates;
	sensors?: (UpdateBoxSensorNew | UpdateBoxSensorEdited | UpdateBoxSensorDeleted)[];
	mqtt?: MQTT;
	ttn?: TTN;
	description?: string;
	image?: string;
	addons?: Record<string | number, string | number>;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L143
 */
export type UpdateBoxResult = {
	code: 'Ok';
	data: BoxDataWithSecrets;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L855C6-L855C6
 */
export type UpdateBoxSensorNew = {
	title: string;
	unit: string;
	sensorType: string;
	icon: string;

	new: true;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L857C7-L857C7
 */
export type UpdateBoxSensorEdited = {
	_id: OpenSenseMapID;

	title: string;
	unit: string;
	sensorType: string;
	icon: string;

	edited: true;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L853
 */
export type UpdateBoxSensorDeleted = {
	_id: OpenSenseMapID;
	deleted: true;
};

import axios from 'axios';
import { literal, mask, object } from 'superstruct';
import type { Coordinates, OpenSenseMapID } from '../globalTypes';
import type { MQTT, Sensor, TTN } from './_boxModels';
import { BOX_DATA_WITH_SECRETS } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 */
export async function updateBox(senseBoxId: OpenSenseMapID, authorization: string, options: UpdateBoxOptions) {
	const reponse = await axios.put(`https://api.opensensemap.org/boxes/${senseBoxId}`, options, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(reponse.data, UPDATE_BOX_RESULT);
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
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L143|OpenSenseMap API code reference on GitHub}
 */
const UPDATE_BOX_RESULT = object({
	code: literal('Ok'),
	data: BOX_DATA_WITH_SECRETS
});

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L855C6-L855C6|OpenSenseMap API code reference on GitHub}
 */
export type UpdateBoxSensorNew = Omit<Sensor, '_id'> & {
	new: true;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L857C7-L857C7|OpenSenseMap API code reference on GitHub}
 */
export type UpdateBoxSensorEdited = Sensor & {
	edited: true;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L853|OpenSenseMap API code reference on GitHub}
 */
export type UpdateBoxSensorDeleted = Pick<Sensor, '_id'> & {
	deleted: true;
};

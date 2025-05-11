import axios from 'axios';
import { type Infer, mask, string } from 'superstruct';
import type { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getSketch
 */
export async function getSketch(senseBoxId: OpenSenseMapID, authorization: string, options?: GetSketchOptions): Promise<GetSketchResult> {
	const response = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/script`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		params: options
	});

	return mask(response.data, GET_SKETCH_RESULT);
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

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L469C21-L469C21
 */
const GET_SKETCH_RESULT = string();
export type GetSketchResult = Infer<typeof GET_SKETCH_RESULT>;

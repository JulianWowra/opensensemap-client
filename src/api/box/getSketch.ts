import axios from 'axios';

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

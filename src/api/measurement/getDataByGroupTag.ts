import axios from 'axios';
import { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataByGroupTag
 */
export async function getDataByGroupTag(grouptag: string | string[]): Promise<GetDataByGroupTagResult> {
	try {
		return (
			await axios.get('https://api.opensensemap.org/boxes/data/bytag', {
				params: {
					grouptag: Array.isArray(grouptag) ? grouptag.join() : grouptag
				}
			})
		).data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404 && error.response.data?.message === 'No senseBoxes found') {
			return [];
		}

		throw error;
	}
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L807
 */
export type GetDataByGroupTagResult = {
	boxId: OpenSenseMapID;
	sensorId: OpenSenseMapID;
	value: string;
	createdAt: string;
}[];

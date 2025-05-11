import axios from 'axios';
import { array, type Infer, mask, object, string } from 'superstruct';
import { DATE_RFC3339, OPENSENSEMAP_ID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataByGroupTag
 */
export async function getDataByGroupTag(grouptag: string | string[]): Promise<GetDataByGroupTagResult> {
	try {
		const response = await axios.get('https://api.opensensemap.org/boxes/data/bytag', {
			params: {
				grouptag: Array.isArray(grouptag) ? grouptag.join() : grouptag
			}
		});

		return mask(response.data, GET_DATA_BY_GROUP_TAG_RESULT);
	} catch (error) {
		if (
			axios.isAxiosError<{ message?: string }>(error) &&
			error.response?.status === 404 &&
			error.response.data?.message === 'No senseBoxes found'
		) {
			return [];
		}

		throw error;
	}
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L807
 */
const GET_DATA_BY_GROUP_TAG_RESULT = array(
	object({
		boxId: OPENSENSEMAP_ID,
		sensorId: OPENSENSEMAP_ID,
		value: string(),
		createdAt: DATE_RFC3339
	})
);

export type GetDataByGroupTagResult = Infer<typeof GET_DATA_BY_GROUP_TAG_RESULT>;

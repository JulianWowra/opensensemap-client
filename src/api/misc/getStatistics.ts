import axios from 'axios';
import { array, mask, number, string, union } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Misc-getStatistics
 */
export async function getStatistics(options?: GetStatisticsOptions) {
	const response = await axios.get('https://api.opensensemap.org/stats', {
		params: options
	});

	return mask(response.data, GET_STATISTICS_RESULT);
}

export type GetStatisticsOptions = {
	human?: boolean;
};

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L43|OpenSenseMap API code reference on GitHub}
 */
const GET_STATISTICS_RESULT = union([array(number()), array(string())]);

import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Misc-getStatistics
 */
export async function getStatistics(options?: GetStatisticsOptions): Promise<GetStatisticsResult> {
	return (
		await axios.get('https://api.opensensemap.org/stats', {
			params: options
		})
	).data;
}

export type GetStatisticsOptions = {
	human?: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L43
 */
export type GetStatisticsResult = number[] | string[];

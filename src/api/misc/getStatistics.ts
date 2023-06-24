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

export type GetStatisticsResult = number[] | string[];

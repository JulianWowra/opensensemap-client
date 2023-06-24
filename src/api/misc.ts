import axios from 'axios';

//
// https://docs.opensensemap.org/#api-Misc
//

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

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<PrintRoutesResult> {
	return (await axios.get('https://api.opensensemap.org/')).data;
}

export type PrintRoutesResult = string;

import axios from 'axios';

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

export type GetDataByGroupTagResult = {
	boxId: string;
	sensorId: string;
	value: string;
	createdAt: string;
}[];

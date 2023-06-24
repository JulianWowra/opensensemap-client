import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<PrintRoutesResult> {
	return (await axios.get('https://api.opensensemap.org/')).data;
}

export type PrintRoutesResult = string;

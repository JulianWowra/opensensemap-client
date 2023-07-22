import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<PrintRoutesResult> {
	return (await axios.get('https://api.opensensemap.org/')).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/routes.js#L67
 */
export type PrintRoutesResult = string;

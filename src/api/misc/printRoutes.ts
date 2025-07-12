import axios from 'axios';
import { mask, string } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes() {
	const response = await axios.get('https://api.opensensemap.org/');
	return mask(response.data, PRINT_ROUTES_RESULT);
}

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/routes.js#L67|OpenSenseMap API code reference on GitHub}
 */
const PRINT_ROUTES_RESULT = string();

import axios from 'axios';
import { type Infer, mask, string } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<PrintRoutesResult> {
	const response = await axios.get('https://api.opensensemap.org/');
	return mask(response.data, PRINT_ROUTES_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/routes.js#L67
 */
const PRINT_ROUTES_RESULT = string();
export type PrintRoutesResult = Infer<typeof PRINT_ROUTES_RESULT>;

import axios from 'axios';
import { array, integer, literal, mask, object } from 'superstruct';
import { BOX_DATA_WITH_SECRETS } from '../box/_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBoxes
 */
export async function getUserBoxes(authorization: string, options?: GetUserBoxesOptions) {
	const response = await axios.get('https://api.opensensemap.org/users/me/boxes', {
		params: options,
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, GET_USER_BOXES_RESULT);
}

export type GetUserBoxesOptions = {
	page?: number;
};

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/api/lib/controllers/usersController.js#L259|OpenSenseMap API code reference on GitHub}
 */
const GET_USER_BOXES_RESULT = object({
	code: literal('Ok'),
	data: object({
		boxes: array(BOX_DATA_WITH_SECRETS),
		boxes_count: integer(),
		sharedBoxes: array(BOX_DATA_WITH_SECRETS)
	})
});

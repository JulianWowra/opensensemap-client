import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';
import { BOX_DATA_WITH_SECRETS } from '../box/_boxModels';
import type { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBox
 */
export async function getUserBox(senseBoxId: OpenSenseMapID, authorization: string): Promise<GetUserBoxResult> {
	const response = await axios.get(`https://api.opensensemap.org/users/me/boxes/${senseBoxId}`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return mask(response.data, GET_USER_BOX_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/api/lib/controllers/usersController.js#L281
 */
const GET_USER_BOX_RESULT = object({
	code: literal('Ok'),
	data: object({
		box: BOX_DATA_WITH_SECRETS
	})
});

export type GetUserBoxResult = Infer<typeof GET_USER_BOX_RESULT>;

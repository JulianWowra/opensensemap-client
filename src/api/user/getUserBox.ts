import axios from 'axios';
import { BoxDataWithSecrets } from '../box/_boxModels';
import { OpenSenseMapID } from '../globalTypes';

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBox
 */
export async function getUserBox(senseBoxId: OpenSenseMapID, authorization: string): Promise<GetUserBoxResult> {
	return (
		await axios.get(`https://api.opensensemap.org/users/me/boxes/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/api/lib/controllers/usersController.js#L281
 */
export type GetUserBoxResult = {
	code: 'Ok';
	data: {
		box: BoxDataWithSecrets;
	};
};

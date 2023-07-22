import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Users-deleteUser
 */
export async function deleteUser(password: string, authorization: string): Promise<DeleteUserResult> {
	return (
		await axios.delete('https://api.opensensemap.org/users/me', {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				password
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L330
 */
export type DeleteUserResult = {
	code: 'Ok';
	message: 'User and all boxes of user marked for deletion. Bye Bye!';
};

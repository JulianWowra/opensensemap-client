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

export type DeleteUserResult = {
	code: 'Ok';
	message: 'User and all boxes of user marked for deletion. Bye Bye!';
};

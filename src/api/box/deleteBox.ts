import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-deleteBox
 */
export async function deleteBox(senseBoxId: string, authorization: string, password: string): Promise<DeleteBoxResult> {
	return (
		await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				password
			}
		})
	).data;
}

export type DeleteBoxResult = {
	code: 'Ok';
	message: 'box and all associated measurements marked for deletion';
};

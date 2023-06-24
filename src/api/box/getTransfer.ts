import axios from 'axios';
import { OpenSenseMapID } from '../globalTypes';
import { BoxTransferInformation } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getTransfer
 */
export async function getTransfer(senseBoxId: OpenSenseMapID, authorization: string): Promise<GetTransferResult> {
	return (
		await axios.get(`https://api.opensensemap.org/boxes/transfer/${senseBoxId}`, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L512C3-L512C3
 */
export type GetTransferResult = {
	data: BoxTransferInformation;
};

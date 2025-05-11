import axios from 'axios';
import { type Infer, literal, mask, object } from 'superstruct';
import type { DateRFC3339, OpenSenseMapID } from '../globalTypes';
import { BOX_TRANSFER_INFORMATION } from './_boxModels';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-createTransfer
 */
export async function createTransfer(
	senseBoxId: OpenSenseMapID,
	expiresAt: DateRFC3339,
	authorization: string
): Promise<CreateTransferResult> {
	const response = await axios.post(
		'https://api.opensensemap.org/boxes/transfer',
		{
			boxId: senseBoxId,
			date: expiresAt
		},
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return mask(response.data, CREATE_TRANSFER_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/boxesController.js#L533C2-L533C3
 */
const CREATE_TRANSFER_RESULT = object({
	message: literal('Box successfully prepared for transfer'),
	data: BOX_TRANSFER_INFORMATION
});

export type CreateTransferResult = Infer<typeof CREATE_TRANSFER_RESULT>;

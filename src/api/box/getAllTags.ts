import axios from 'axios';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getAllTags
 */
export async function getAllTags(): Promise<GetAllTagsResult> {
	return (await axios.get(`https://api.opensensemap.org/tags`)).data;
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/11695a33cf0260a62aecbefd76c46735b690be62/packages/api/lib/controllers/boxesController.js#L704C5-L704C5
 */
export type GetAllTagsResult = {
	code: 'Ok';
	data: string[];
};

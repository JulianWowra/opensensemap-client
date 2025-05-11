import axios from 'axios';
import { array, type Infer, literal, mask, object, string } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getAllTags
 */
export async function getAllTags(): Promise<GetAllTagsResult> {
	const response = await axios.get(`https://api.opensensemap.org/tags`);
	return mask(response.data, GET_ALL_TAGS_RESULT);
}

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/11695a33cf0260a62aecbefd76c46735b690be62/packages/api/lib/controllers/boxesController.js#L704C5-L704C5
 */
const GET_ALL_TAGS_RESULT = object({
	code: literal('Ok'),
	data: array(string())
});

export type GetAllTagsResult = Infer<typeof GET_ALL_TAGS_RESULT>;

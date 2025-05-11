import axios from 'axios';
import { type Infer, literal, mask, object, string } from 'superstruct';
import { type Language, USER_DATA, type UserName } from './_userModels';

/**
 * @see https://docs.opensensemap.org/#api-Users-register
 */
export async function register(userName: UserName, email: string, password: string, options?: RegisterOptions): Promise<RegisterResult> {
	const response = await axios.post(
		'https://api.opensensemap.org/users/register',
		Object.assign(
			{
				name: userName,
				email,
				password
			},
			options
		)
	);

	return mask(response.data, REGISTER_RESULT);
}

export type RegisterOptions = {
	language?: Language;
	integrations?: object;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/usersController.js#L67
 */
const REGISTER_RESULT = object({
	code: literal('Created'),
	message: literal('Successfully registered new user'),
	data: object({
		user: USER_DATA
	}),
	token: string(),
	refreshToken: string()
});

export type RegisterResult = Infer<typeof REGISTER_RESULT>;

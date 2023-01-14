import axios from 'axios';
import { BoxData } from './boxes';

//
// https://docs.opensensemap.org/#api-Users
//

/**
 * @see https://docs.opensensemap.org/#api-Users-register
 */
export async function register(
	name: string,
	email: string,
	password: string,
	options?: RegisterOptions
): Promise<{
	code: 'Created';
	message: 'Successfully registered new user';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
}> {
	return (
		await axios.post(
			'https://api.opensensemap.org/users/register',
			Object.assign(
				{
					name,
					email,
					password
				},
				options
			)
		)
	).data;
}

export type RegisterOptions = {
	language: string;
};

/**
 * @see https://docs.opensensemap.org/#api-Users-deleteUser
 */
export async function deleteUser(
	password: string,
	authorization: string
): Promise<{
	code: 'Ok';
	message: 'User and all boxes of user marked for deletion. Bye Bye!';
}> {
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
 * @see https://docs.opensensemap.org/#api-Users-getUser
 */
export async function getUser(authorization: string): Promise<{
	code: 'Ok';
	data: {
		me: User;
	};
}> {
	return (
		await axios.get('https://api.opensensemap.org/users/me', {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-refresh_auth
 */
export async function refreshAuth(token: string): Promise<{
	code: 'Authorized';
	message: 'Successfully refreshed auth';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
}> {
	return (
		await axios.post('https://api.opensensemap.org/users/refresh-auth', {
			token
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_in
 */
export async function signIn(
	email: string,
	password: string
): Promise<{
	code: 'Authorized';
	message: 'Successfully signed in';
	data: {
		user: User;
	};
	token: string;
	refreshToken: string;
}> {
	return (
		await axios.post('https://api.opensensemap.org/users/sign-in', {
			email,
			password
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-sign_out
 */
export async function signOut(authorization: string): Promise<{ code: 'Ok'; message: 'Successfully signed out' }> {
	return (
		await axios.post('https://api.opensensemap.org/users/sign-out', undefined, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-updateUser
 */
export async function updateUser(
	currentPassword: string,
	authorization: string,
	options: UpdateUserOptions
): Promise<UserUpdated | UserNotUpdated> {
	return (
		await axios.put(
			'https://api.opensensemap.org/users/me',
			Object.assign(
				{
					currentPassword
				},
				options
			),
			{
				headers: {
					Authorization: `Bearer ${authorization}`
				}
			}
		)
	).data;
}

export type UpdateUserOptions = {
	email?: string;
	language?: 'en_US' | 'de_DE';
	name?: string;
	newPassword?: string;
};

/**
 * @see https://docs.opensensemap.org/#api-Users-confirm_email
 */
export async function confirmEmail(
	email: string,
	token: string
): Promise<{
	code: 'Ok';
	message: 'E-Mail successfully confirmed. Thank you';
}> {
	return (
		await axios.post('https://api.opensensemap.org/users/confirm-email', {
			email,
			token
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-getUserBoxes
 */
export async function getUserBoxes(authorization: string): Promise<{ code: 'Ok'; data: { boxes: BoxData[]; sharedBoxes: BoxData[] } }> {
	return (
		await axios.get('https://api.opensensemap.org/users/me/boxes', {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-resend_email_confirmation
 */
export async function resendEmailConfirmation(authorization: string): Promise<{
	code: 'Ok';
	message: string;
}> {
	return (
		await axios.post('https://api.opensensemap.org/users/me/resend-email-confirmation', undefined, {
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-request_password_reset
 */
export async function requestPasswordReset(email: string): Promise<{ code: 'Ok'; message: 'Password reset initiated' }> {
	return (
		await axios.post('https://api.opensensemap.org/users/request-password-reset', {
			email
		})
	).data;
}

/**
 * @see https://docs.opensensemap.org/#api-Users-password_reset
 */
export async function passwordReset(
	password: string,
	token: string
): Promise<{
	code: 'Ok';
	message: 'Password successfully changed. You can now login with your new password';
}> {
	return (
		await axios.post('https://api.opensensemap.org/users/password-reset', {
			password,
			token
		})
	).data;
}

export interface UserUpdated {
	code: 'Ok';
	message:
		| 'User successfully saved.'
		| 'User successfully saved. E-Mail changed. Please confirm your new address. Until confirmation, sign in using your old address'
		| 'User successfully saved. Password changed. Please sign in with your new password'
		| string;
	data: {
		me: User;
	};
}

export interface UserNotUpdated {
	code: 'Ok';
	message: 'User successfully saved.';
	data: {
		me: { updated: false };
	};
}

export interface User {
	name: string;
	email: string;
	role: string;
	language: string;
	boxes: string[];
	emailIsConfirmed: boolean;
}

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

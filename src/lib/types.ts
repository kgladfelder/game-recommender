export type AccessToken = {
	userId: string;
	admin: boolean;
	timeToExpire: number;
};

export type UIUser = {
	username: string;
	email: string;
}
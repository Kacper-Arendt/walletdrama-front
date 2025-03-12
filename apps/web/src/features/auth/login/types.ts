export interface ActionResponse {
	success: boolean | null;
	message: string;
	errors?: {
		[K in keyof LoginUserPayload]?: string[];
	};
	inputs?: LoginUserPayload;
}

export interface LoginUserPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	tokenType: "Bearer";
	accessToken: string;
	expiresIn: number;
	refreshToken: string;
}

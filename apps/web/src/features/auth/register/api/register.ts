import { apiConfig } from "config/app";

export interface RegisterRequest {
	email: string;
	password: string;
}

export const register = async (data: RegisterRequest) => {
	return await fetch(`${apiConfig.baseUrl}/api/users/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

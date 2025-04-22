import { apiConfig } from "@/config/app";
import type { RegisterUserPayload } from "@/features/auth/register/types";

export const register = async (data: RegisterUserPayload) => {
	return await fetch(`${apiConfig.baseUrl}/api/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

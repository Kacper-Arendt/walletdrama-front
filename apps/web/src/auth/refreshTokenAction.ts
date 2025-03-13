"use server";

import { apiConfig } from "config/app";
import type { LoginResponse } from "features/auth/login/types";

export async function refreshTokenAction(refreshToken: string) {
	const response = await fetch(`${apiConfig.baseUrl}/api/auth/refresh`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ refreshToken }),
	});

	if (!response.ok) return null;

	const tokens: LoginResponse = await response.json();

	return tokens;
}

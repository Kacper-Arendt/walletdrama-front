"use server";
import { getAuthTokens } from "auth/handleTokens";
import { apiConfig } from "config/app";
import { redirect } from "next/navigation";

export async function apiClient(endpoint: string, options: RequestInit = {}) {
	const { token } = await getAuthTokens();

	if (!token) {
		console.log("[Error] redirecting to auth because no token");
		redirect("/auth");
	}

	const headers = new Headers(options.headers || {});
	headers.set("Authorization", token);

	const response = await fetch(`${apiConfig.baseUrl}/${endpoint}`, {
		...options,
		headers,
	});

	if (response.status === 401) {
		console.log("[Error] redirecting to auth because 401");
		redirect("/auth");
	}

	return {
		response,
		json: await response.json(),
	};
}

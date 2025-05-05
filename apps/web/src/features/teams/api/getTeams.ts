import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { Teams } from "@/features/teams/types/teams";

export const getTeams = async () => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/teams`, {
		method: "GET",
		credentials: "include",
		headers: {
			Cookie: session?.sessionCookie ?? "",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch teams");
	}

	const data = await response.json();
	return data as Teams[];
};

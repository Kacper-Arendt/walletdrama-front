import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";

export const createTeam = async (data: { name: string }) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/teams`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Cookie: session?.sessionCookie ?? "",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to save team");
	}

	const res = await response.json();
	return res as { id: string };
};

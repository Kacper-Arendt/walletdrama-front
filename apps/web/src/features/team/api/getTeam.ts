import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { Team } from "@/features/team/types/team";

export const getTeam = async (id: string) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/teams/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			Cookie: session?.sessionCookie ?? "",
		},
		next: { tags: [`team-${id}`], revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch teams");
	}

	const data = await response.json();
	return data as Team;
};

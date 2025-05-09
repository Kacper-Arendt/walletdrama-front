import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";

export const deleteTeam = async (id: string) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/teams/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			Cookie: session?.sessionCookie ?? "",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete team");
	}

	return { deleted: true };
};

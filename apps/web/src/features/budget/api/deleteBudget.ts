import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";

export const deleteBudget = async (id: string) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/budgets/${id}`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Cookie: session?.sessionCookie ?? "",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete budget");
	}
};

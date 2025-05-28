import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { Budgets } from "@/features/budgets/types/budgets";

export const createBudget = async (
	data: Pick<Budgets, "name" | "description">,
) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/budgets`, {
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
		throw new Error("Failed to save budget");
	}

	const res = await response.json();
	return res as { id: string };
};

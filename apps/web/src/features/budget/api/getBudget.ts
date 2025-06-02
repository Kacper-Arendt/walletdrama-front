import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { Budget } from "@/features/budget/models/budget";

export const getBudget = async (id: string) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/budgets/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			Cookie: session?.sessionCookie ?? "",
		},
		next: { tags: [`budget-${id}`], revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch budget");
	}

	const data = await response.json();
	return data as Budget;
};

import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { BudgetDetailsFormData } from "@/features/budget/models/budget";

export const updateBudget = async (data: BudgetDetailsFormData) => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/budgets/${data.id}`, {
		method: "PUT",
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
};

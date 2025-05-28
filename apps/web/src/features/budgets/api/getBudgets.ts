import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";
import type { Budgets } from "@/features/budgets/types/budgets";

export const getBudgets = async (): Promise<Budgets[]> => {
	const session = await getSessionCookie();
	const response = await fetch(`${apiConfig.baseUrl}/api/budgets`, {
		method: "GET",
		credentials: "include",
		headers: {
			Cookie: session?.sessionCookie ?? "",
		},
		next: { tags: ["budgets"], revalidate: 60 },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch budgets");
	}

	const data = await response.json();
	return data as Budgets[];
};

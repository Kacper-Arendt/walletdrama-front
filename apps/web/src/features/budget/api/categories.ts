import { apiConfig } from "@/config/app";
import { getSessionCookie } from "@/features/auth/session/getSessionCookie";

export interface Category {
	id: string;
	name: string;
	description?: string;
	budgetId: string;
	type: number;
}

export const getCategories = async (budgetId: string): Promise<Category[]> => {
	const session = await getSessionCookie();
	const response = await fetch(
		`${apiConfig.baseUrl}/api/budgets/${budgetId}/categories`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				Cookie: session?.sessionCookie ?? "",
			},
			next: { tags: [`categories-${budgetId}`], revalidate: 60 },
		},
	);
	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}
	return (await response.json()) as Category[];
};

export const createCategory = async (data: Omit<Category, "id">) => {
	const session = await getSessionCookie();
	const response = await fetch(
		`${apiConfig.baseUrl}/api/budgets/${data.budgetId}/categories`,
		{
			method: "POST",
			credentials: "include",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: session?.sessionCookie ?? "",
			},
		},
	);
	if (!response.ok) {
		throw new Error("Failed to create category");
	}
	return (await response.json()) as Category;
};

export const updateCategory = async (data: Category) => {
	const session = await getSessionCookie();
	const response = await fetch(
		`${apiConfig.baseUrl}/api/budgets/${data.budgetId}/categories/${data.id}`,
		{
			method: "PUT",
			credentials: "include",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: session?.sessionCookie ?? "",
			},
		},
	);
	if (!response.ok) {
		throw new Error("Failed to update category");
	}
};

export const deleteCategory = async (budgetId: string, id: string) => {
	const session = await getSessionCookie();
	const response = await fetch(
		`${apiConfig.baseUrl}/api/budgets/${budgetId}/categories/${id}`,
		{
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Cookie: session?.sessionCookie ?? "",
			},
		},
	);
	if (!response.ok) {
		throw new Error("Failed to delete category");
	}
};

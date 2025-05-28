"use server";
import { createBudget } from "@/features/budgets/api/createBudget";
import type { Budgets } from "@/features/budgets/types/budgets";
import { revalidateTag } from "next/cache";

export async function createBudgetAction(
	data: Pick<Budgets, "name" | "description">,
) {
	try {
		const res = await createBudget(data);
		if (res.id) {
			revalidateTag("budgets");
			return res;
		}
	} catch (error) {
		return null;
	}
}

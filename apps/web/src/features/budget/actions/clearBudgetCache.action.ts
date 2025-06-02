"use server";

import { revalidateTag } from "next/cache";

export async function clearBudgetCache(budgetId: string) {
	revalidateTag(`budget-${budgetId}`);
}

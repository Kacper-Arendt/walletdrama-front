"use server";

import { deleteBudget } from "@/features/budget/api/deleteBudget";
import { roleGuard } from "@/features/budget/authorization/roleGuard";
import { revalidateTag } from "next/cache";

export async function deleteBudgetDetails(id: string) {
	try {
		const canUpdate = await roleGuard({ id: id, requiredRole: "Owner" });
		if (!canUpdate) return null;

		await deleteBudget(id);
		revalidateTag("budgets");
		return { deleted: true };
	} catch (e) {
		return null;
	}
}

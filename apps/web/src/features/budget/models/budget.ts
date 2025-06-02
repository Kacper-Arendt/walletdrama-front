import type { Budgets } from "@/features/budgets/types/budgets";
import type { ActionResponse } from "@/types/form";

export interface Budget {
	id: string;
	name: string;
	description?: string;
	ownerId: string;
}

export interface BudgetDetailsFormData
	extends Pick<Budgets, "name" | "description" | "id"> {}

export interface UpdateDataActionResponse
	extends ActionResponse<BudgetDetailsFormData> {}

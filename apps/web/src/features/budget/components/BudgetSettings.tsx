import { getBudget } from "@/features/budget/api/getBudget";
import { roleGuard } from "@/features/budget/authorization/roleGuard";
import { BudgetSettingsForm } from "@/features/budget/components/BudgetSettings.Form";
import { ClearBudgetCacheButton } from "@/features/budget/components/ClearBudgetCacheButton";
import { DeleteBudget } from "@/features/budget/components/DeleteBudget";

export const BudgetSettings = async ({ id }: { id: string }) => {
	const budget = await getBudget(id);
	const canUpdate = await roleGuard({ id, requiredRole: "Owner" });

	return (
		<>
			{canUpdate && (
				<BudgetSettingsForm
					initData={{
						id: budget.id,
						name: budget.name,
						description: budget.description ?? "",
					}}
				/>
			)}
			<div className="mt-4">
				<ClearBudgetCacheButton budgetId={id} />
			</div>
			<DeleteBudget id={id} />
		</>
	);
};

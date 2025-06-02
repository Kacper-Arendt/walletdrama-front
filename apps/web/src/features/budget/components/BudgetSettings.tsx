import { isOwnerAction } from "@/features/budget/actions/isOwner.action";
import { getBudget } from "@/features/budget/api/getBudget";
import { BudgetSettingsForm } from "@/features/budget/components/BudgetSettings.Form";
import { ClearBudgetCacheButton } from "@/features/budget/components/ClearBudgetCacheButton";

export const BudgetSettings = async ({ id }: { id: string }) => {
	const budget = await getBudget(id);
	const canUpdate = await isOwnerAction(id);

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
		</>
	);
};

import { getBudgets } from "@/features/budgets/api/getBudgets";
import { BudgetList } from "@/features/budgets/components/BudgetList";
import { BudgetsHeader } from "@/features/budgets/components/BudgetsHeader";

export default async function Budgets() {
	const budgets = await getBudgets();

	return (
		<>
			<BudgetsHeader />
			<BudgetList data={budgets} />
		</>
	);
}

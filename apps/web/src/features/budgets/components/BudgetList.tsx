import { BudgetListItem } from "@/features/budgets/components/BudgetListItem";
import type { Budgets } from "@/features/budgets/types/budgets";
import { getTranslations } from "next-intl/server";

interface BudgetListProps {
	title?: string;
	data: Budgets[];
}

export async function BudgetList({ data }: BudgetListProps) {
	const t = await getTranslations("budgets");

	return (
		<div>
			<h2 className="text-2xl font-bold text-foreground">
				{t("your_budgets")}
			</h2>
			<ul className="flex flex-col gap-3 w-full py-3">
				{data.map((budget) => (
					<BudgetListItem key={budget.id} {...budget} />
				))}
			</ul>
		</div>
	);
}

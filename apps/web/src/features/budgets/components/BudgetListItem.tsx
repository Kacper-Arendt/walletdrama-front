import type { Budgets } from "@/features/budgets/types/budgets";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const BudgetListItem = async ({ id, name }: Budgets) => {
	const t = await getTranslations("shared");

	return (
		<li className="flex items-center justify-between p-4 border rounded-xl border-border bg-background shadow-sm">
			<div className="flex flex-col">
				<span className="text-lg font-semibold text-foreground">{name}</span>
			</div>
			<div className="flex items-center">
				<Link
					href={`budgets/${id}`}
					className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
				>
					{t("view")}
				</Link>
			</div>
		</li>
	);
};

import { getCategories } from "@/features/budget/api/categories";
import { AddNewCategory } from "@/features/budget/components/categories/AddNewCategory";
import { CategoriesList } from "@/features/budget/components/categories/CategoriesList";
import { H4 } from "@ui/components/typography";
import { getTranslations } from "next-intl/server";

export const Categories = async ({ budgetId }: { budgetId: string }) => {
	const t = await getTranslations("budget");
	const categories = await getCategories(budgetId);

	const expenses = categories?.filter((cat) => cat.type === 1);
	const incomes = categories?.filter((cat) => cat.type === 2);

	return (
		<>
			<div className="flex flex-wrap gap-20">
				<div className="w-full md:max-w-xl">
					<H4>
						{t("expenses")} ({expenses?.length ?? 0})
					</H4>
					<AddNewCategory type={1} budgetId={budgetId} />
					<CategoriesList list={expenses ?? []} />
				</div>
				<div className="w-full md:max-w-xl">
					<H4>
						{t("incomes")} ({incomes?.length ?? 0})
					</H4>
					<AddNewCategory type={2} budgetId={budgetId} />
					<CategoriesList list={incomes ?? []} />
				</div>
			</div>
		</>
	);
};

import { getCategories } from "@/features/budget/api/categories";
import { CategoriesList } from "@/features/budget/components/categories/CategoriesList";
import { getTranslations } from "next-intl/server";

export const Categories = async ({ budgetId }: { budgetId: string }) => {
	const t = await getTranslations("budget");
	const categories = await getCategories(budgetId);

	const expenses = categories?.filter((cat) => cat.type === 1);
	const incomes = categories?.filter((cat) => cat.type === 2);

	return (
		<>
			<div className="flex flex-wrap gap-20">
				<CategoriesList title={t("expenses")} list={expenses ?? []} />
				<CategoriesList title={t("incomes")} list={incomes ?? []} />
			</div>
		</>
	);
};

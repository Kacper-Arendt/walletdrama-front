import { getBudget } from "@/features/budget/api/getBudget";
import { Muted, Small } from "@ui/components/typography";
import { Card, CardContent } from "@ui/components/ui/card";
import { getTranslations } from "next-intl/server";

export const BudgetDetails = async ({ id }: { id: string }) => {
	const t = await getTranslations("budget");
	const budget = await getBudget(id);

	return (
		<Card className="max-w-[500px]">
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Small className="text-muted-foreground">{t("created")}</Small>
						<p className="text-sm">TODO</p>
					</div>
					<div>
						<Small className="text-muted-foreground">{t("updated")}</Small>
						<Muted className="text-sm">TODO</Muted>
					</div>
				</div>

				<div>
					<Small className="text-muted-foreground">{t("description")}</Small>
					{budget?.description && (
						<Small className="mt-1">{budget.description}</Small>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

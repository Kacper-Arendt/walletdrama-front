import { getBudget } from "@/features/budget/api/getBudget";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { getTranslations } from "next-intl/server";

export const BudgetDetails = async ({ id }: { id: string }) => {
	const t = await getTranslations("budget");
	const budget = await getBudget(id);

	return (
		<Card className="max-w-[500px]">
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/*<div>*/}
					{/*	<h3 className="text-sm font-medium text-muted-foreground">*/}
					{/*		Currency*/}
					{/*	</h3>*/}
					{/*	/!*<p className="text-sm">{budget.currency}</p>*!/*/}
					{/*</div>*/}
					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							{t("created")}
						</h3>
						<p className="text-sm">
							TODO
							{/*{format(new Date(budget.createdAt), "PPP")}*/}
						</p>
					</div>
					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							{t("updated")}
						</h3>
						<p className="text-sm">
							TODO
							{/*{format(new Date(budget.updatedAt), "PPP")}*/}
						</p>
					</div>
				</div>

				<div>
					<h3 className="text-sm font-medium text-muted-foreground">
						{t("description")}
					</h3>
					{budget?.description && (
						<p className="text-sm mt-1">{budget.description}</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

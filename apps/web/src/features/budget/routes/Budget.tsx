import { getBudget } from "@/features/budget/api/getBudget";
import { BudgetDetails } from "@/features/budget/components/BudgetDetails";
import { BudgetHeader } from "@/features/budget/components/BudgetHeader";
import { BudgetSettings } from "@/features/budget/components/BudgetSettings";
import { Categories } from "@/features/budget/components/categories/Categories";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@ui/components/ui/tabs";
import { ChartBarStacked, FileText, Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const Budget = async ({ id }: { id: string }) => {
	const budget = await getBudget(id);
	const t = await getTranslations("budget");

	if (!budget) return notFound();

	return (
		<>
			<title>{budget.name}</title>
			<BudgetHeader name={budget.name} />

			<Tabs defaultValue="details" className="items-start">
				<TabsList className="grid w-full grid-cols-4 md:w-auto">
					<TabsTrigger value="details">
						<FileText className="mr-2 h-4 w-4" />
						{t("details")}
					</TabsTrigger>
					{/*<TabsTrigger value="overview">*/}
					{/*	<DollarSign className="mr-2 h-4 w-4" />*/}
					{/*	Overview*/}
					{/*</TabsTrigger>*/}
					{/*<TabsTrigger value="months">*/}
					{/*	<Calendar className="mr-2 h-4 w-4" />*/}
					{/*	Months*/}
					{/*</TabsTrigger>*/}
					<TabsTrigger value="categories">
						<ChartBarStacked className="mr-2 h-4 w-4" />
						{t("categories")}
					</TabsTrigger>
					<TabsTrigger value="settings">
						<Settings className="mr-2 h-4 w-4" />
						{t("settings")}
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="space-y-4 pt-4">
					<BudgetDetails id={id} />
				</TabsContent>

				<TabsContent value="categories" className="space-y-4 pt-4">
					<Categories budgetId={id} />
				</TabsContent>

				{/*<TabsContent value="overview" className="space-y-4 pt-4">*/}
				{/*	/!*<BudgetOverview budget={budget} />*!/*/}
				{/*	overview content goes here*/}
				{/*</TabsContent>*/}

				{/*<TabsContent value="months" className="space-y-4 pt-4">*/}
				{/*	/!*<MonthsList months={budget.months} />*!/*/}
				{/*	months content goes here*/}
				{/*</TabsContent>*/}

				<TabsContent value="settings" className="space-y-4 pt-4">
					<BudgetSettings id={id} />
				</TabsContent>
			</Tabs>
		</>
	);
};

import { Button } from "@ui/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const BudgetHeader = async ({ name }: { name: string }) => {
	const t = await getTranslations("budget");

	return (
		<div className="flex items-center justify-between pb-5">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">{name}</h1>
			</div>
			<div className="flex items-center gap-2">
				<Button>
					<PlusCircle className="mr-2 h-4 w-4" />
					{t("add_month")}
				</Button>
			</div>
		</div>
	);
};

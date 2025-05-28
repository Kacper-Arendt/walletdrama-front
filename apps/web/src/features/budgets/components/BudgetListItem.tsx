import type { Budgets } from "@/features/budgets/types/budgets";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const BudgetListItem = async ({ id, name, description }: Budgets) => {
	const t = await getTranslations("shared");

	return (
		<Card className="w-[280px]">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardFooter className="mt-auto ml-auto">
				<Link href={`budgets/${id}`}>{t("view")}</Link>
			</CardFooter>
		</Card>
	);
};

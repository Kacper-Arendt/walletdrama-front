import type { Budgets } from "@/features/budgets/types/budgets";
import { Button } from "@ui/components/ui/button";
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
		<Card className="w-full md:w-[280px]">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				{description && (
					<CardDescription className="line-clamp-4" title={description}>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardFooter className="mt-auto ml-auto">
				<Button asChild>
					<Link href={`/budgets/${id}`}>{t("view")}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

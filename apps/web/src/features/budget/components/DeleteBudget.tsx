"use client";

import { deleteBudgetDetails } from "@/features/budget/actions/deleteBudget.action";
import { Button } from "@ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/ui/dialog";
import { toast } from "@ui/components/ui/sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const DeleteBudget = ({ id }: { id: string }) => {
	const router = useRouter();
	const t = useTranslations("budget.delete");

	const handleSubmit = async () => {
		try {
			const res = await deleteBudgetDetails(id);
			if (res?.deleted) {
				toast.error(t("success"));
				router.push("/budgets");
			}
		} catch (error) {
			toast.error(t("error"));
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive">{t("delete")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("confirm")}</DialogTitle>
					<DialogDescription>{t("description")} </DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit} variant="destructive">
						{t("delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

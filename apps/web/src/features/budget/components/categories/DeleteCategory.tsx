"use client";

import { deleteCategoryAction } from "@/features/budget/actions/category.actions";
import { Button } from "@ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@ui/components/ui/dialog";
import { toast } from "@ui/components/ui/sonner";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: { id: string; budgetId: string; name: string };
};

export default function DeleteCategory({
	open,
	onOpenChange,
	category,
}: Props) {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const handleDelete = () => {
		startTransition(async () => {
			const res = await deleteCategoryAction(category.id, category.budgetId);
			if (res?.deleted) {
				onOpenChange(false);
				toast.success(t("shared.delete_success"));
			} else {
				toast.error(t("shared.delete_success"));
			}
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("budget.category_delete")}</DialogTitle>
				</DialogHeader>
				<p>
					{t("budget.category_delete_confirm")}
					<br />
					<strong>{category.name}</strong>
				</p>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isPending}
					>
						{t("shared.cancel")}
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
					>
						{t("shared.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

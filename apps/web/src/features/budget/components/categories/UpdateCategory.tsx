"use client";

import { updateCategoryAction } from "@/features/budget/actions/category.actions";
import type { Category } from "@/features/budget/api/categories";
import { SimpleFormItem } from "@ui/components/SimpleFormItem";
import { Button } from "@ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@ui/components/ui/dialog";
import { Input } from "@ui/components/ui/input";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";

const UpdateCategory = ({
	data,
	open,
	onOpenChange,
}: { data: Category; open: boolean; onOpenChange: (val: boolean) => void }) => {
	const t = useTranslations();

	const [state, action, isPending] = useActionState(updateCategoryAction, {
		success: false,
		message: "",
		inputs: {
			id: data.id,
			budgetId: data.budgetId,
			name: data.name,
			description: data.description || "",
			type: data.type,
		},
	});

	useEffect(() => {
		if (state?.success) {
			onOpenChange(false);
		}
	}, [state?.success, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("budget.change_category")}</DialogTitle>
					<DialogDescription>
						{t("budget.change_category_description")}
					</DialogDescription>
				</DialogHeader>
				<form
					action={action}
					autoComplete="off"
					className="flex flex-col gap-4 pt-4"
				>
					<input type="hidden" name="id" value={data.id} />
					<input type="hidden" name="budgetId" value={data.budgetId} />
					<input type="hidden" name="type" value={data.type} />
					<SimpleFormItem
						id="name"
						label={{ text: t("shared.name"), required: true }}
						errors={state?.errors?.name}
					>
						<Input
							id="name"
							name="name"
							minLength={3}
							required
							defaultValue={state?.inputs?.name || ""}
							aria-describedby="name-error"
						/>
					</SimpleFormItem>
					<SimpleFormItem
						id="description"
						className="flex-1"
						label={{ text: t("shared.description") }}
						errors={state?.errors?.description}
					>
						<Input
							id="description"
							name="description"
							defaultValue={state?.inputs?.description || ""}
							aria-describedby="description-error"
						/>
					</SimpleFormItem>
					<Button variant="default" className="ml-auto" disabled={isPending}>
						{t("shared.update")}
					</Button>
				</form>
				{state?.message && (
					<div
						className={`text-sm pt-2 ${
							state.success ? "text-green-600" : "text-red-600"
						}`}
					>
						{state.message}
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UpdateCategory;

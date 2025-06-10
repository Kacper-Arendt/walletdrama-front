"use client";
import { createCategoryAction } from "@/features/budget/actions/category.actions";
import { SimpleFormItem } from "@ui/components/SimpleFormItem";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { BadgePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

export const AddNewCategory = ({
	type,
	budgetId,
}: { type: number; budgetId: string }) => {
	const t = useTranslations();
	const [state, action, isPending] = useActionState(createCategoryAction, {
		success: false,
		message: "",
		inputs: {
			budgetId,
			name: "",
			description: "",
			type,
		},
	});

	return (
		<div>
			<form
				action={action}
				autoComplete="off"
				className="flex items-center gap-2 pt-4"
			>
				<input type="hidden" name="budgetId" value={budgetId} />
				<input type="hidden" name="type" value={type} />
				<SimpleFormItem id="name">
					<Input
						id="name"
						name="name"
						minLength={3}
						required
						defaultValue={state?.inputs?.name || ""}
						placeholder={t("shared.name")}
						aria-describedby="name-error"
					/>
				</SimpleFormItem>
				<SimpleFormItem id="description" className="flex-1">
					<Input
						id="description"
						name="description"
						placeholder={t("budget.description")}
						defaultValue={state?.inputs?.description || ""}
						aria-describedby="description-error"
					/>
				</SimpleFormItem>
				<Button
					variant="ghost"
					size="icon"
					className={isPending ? "animate-spin" : ""}
					title={t("shared.add_new")}
					aria-label={t("shared.add_new")}
				>
					<BadgePlus />
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
		</div>
	);
};

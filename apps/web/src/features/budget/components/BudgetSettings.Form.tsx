"use client";

import { updateBudgetDetails } from "@/features/budget/actions/updateBudget.action";
import type { BudgetDetailsFormData } from "@/features/budget/models/budget";
import { SimpleFormItem } from "@ui/components/SimpleFormItem";
import { Alert, AlertDescription } from "@ui/components/ui/alert";
import { Button } from "@ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { CheckCircle2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

export const BudgetSettingsForm = ({
	initData,
}: { initData: BudgetDetailsFormData }) => {
	const t = useTranslations();
	const [state, action, isPending] = useActionState(updateBudgetDetails, {
		success: false,
		message: "",
		inputs: initData,
	});

	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>{t("budget.budget_details")}</CardTitle>
				<CardDescription>
					{t("budget.budget_details_description")}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={action} className="space-y-6" autoComplete="on">
					<div className="space-y-4">
						<input type="hidden" name="id" value={initData.id} />
						<SimpleFormItem
							id="name"
							label={{
								text: t("budgets.budget_name"),
								required: true,
							}}
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
							label={{
								text: t("budgets.budget_description"),
								required: false,
							}}
							errors={state?.errors?.description}
						>
							<Textarea
								className="h-50"
								id="description"
								name="description"
								defaultValue={state?.inputs?.description || ""}
								aria-describedby="description-error"
							/>
						</SimpleFormItem>
						{state?.message && (
							<Alert variant={state.success ? "default" : "destructive"}>
								{state.success && <CheckCircle2 className="h-4 w-4" />}
								<AlertDescription>{state.message}</AlertDescription>
							</Alert>
						)}
					</div>

					<Button type="submit" className="w-full" disabled={isPending}>
						<Save className="mr-2 h-4 w-4" />
						{isPending ? t("shared.loading") : t("shared.update")}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

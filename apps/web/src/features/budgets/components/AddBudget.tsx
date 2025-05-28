"use client";
import { createBudgetAction } from "@/features/budgets/actions/createBudgetAction";
import { SimpleFormItem } from "@ui/components/SimpleFormItem";
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
import { Input } from "@ui/components/ui/input";
import { toast } from "@ui/components/ui/sonner";
import { Textarea } from "@ui/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export const AddBudget = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const name = formData.get("name") as string;
		const description = formData.get("description") as string;

		startTransition(() => {
			(async () => {
				try {
					const res = await createBudgetAction({ name, description });
					if (res?.id) {
						toast.success(t("budgets.create_success"));
					} else {
						toast.error(t("budgets.create_error"));
					}
				} catch (error) {
					toast.error(t("budgets.create_error"));
				}
			})();
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">{t("budgets.create_budget")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("budgets.create_budget")}</DialogTitle>
					<DialogDescription>
						{t("budgets.create_budget_description")}{" "}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4 py-4">
						<SimpleFormItem
							label={{
								text: t("budgets.budget_name"),
								required: true,
								htmlFor: "name",
							}}
						>
							<Input id="name" name="name" minLength={3} required />
						</SimpleFormItem>
						<SimpleFormItem
							label={{
								text: t("budgets.budget_description"),
								required: false,
								htmlFor: "description",
							}}
						>
							<Textarea
								className="resize-none"
								id="description"
								name="description"
							/>
						</SimpleFormItem>
					</div>
					<DialogFooter>
						<Button type="submit">
							{t(isPending ? "shared.loading" : "shared.save")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

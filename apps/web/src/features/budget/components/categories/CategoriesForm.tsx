"use client";

import {
	createCategoryAction,
	deleteCategoryAction,
	updateCategoryAction,
} from "@/features/budget/actions/category.actions";
import { type Category, getCategories } from "@/features/budget/api/categories";
import { SimpleFormItem } from "@ui/components/SimpleFormItem";
import { Alert, AlertDescription } from "@ui/components/ui/alert";
import { Button } from "@ui/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { CheckCircle2, Save, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

export const Categories = ({ budgetId }: { budgetId: string }) => {
	const t = useTranslations();
	const [form, setForm] = useState<{
		name: string;
		description: string;
		type: number;
		id?: string;
	}>({ name: "", description: "", type: 1 });
	const [message, setMessage] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);
		startTransition(async () => {
			const formData = new FormData();
			formData.append("name", form.name);
			formData.append("description", form.description);
			formData.append("budgetId", budgetId);
			formData.append("type", String(form.type));
			if (form.id) formData.append("id", form.id);
			const res = form.id
				? await updateCategoryAction(null, formData)
				: await createCategoryAction(null, formData);
			setMessage(res.message);
			if (res.success) {
				setForm({ name: "", description: "", type: 1 });
				setCategories(await getCategories(budgetId));
			}
		});
	};

	const handleEdit = (cat: Category) => {
		setForm({
			id: cat.id,
			name: cat.name,
			description: cat.description ?? "",
			type: cat.type,
		});
	};

	const handleDelete = async (id: string) => {
		startTransition(async () => {
			await deleteCategoryAction(id, budgetId);
			setCategories(await getCategories(budgetId));
		});
	};

	return (
		<Card className="max-w-2xl">
			<CardHeader>
				<CardTitle>{t("budget.categories")}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4 mb-6">
					<div className="flex gap-2">
						<SimpleFormItem
							id="name"
							label={{ text: t("budgets.budget_name"), required: true }}
						>
							<Input
								id="name"
								name="name"
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({ ...f, name: e.target.value }))
								}
								minLength={1}
								required
							/>
						</SimpleFormItem>
						<SimpleFormItem id="type" label={{ text: "Type", required: true }}>
							<Input
								id="type"
								name="type"
								type="number"
								value={form.type}
								onChange={(e) =>
									setForm((f) => ({ ...f, type: Number(e.target.value) }))
								}
								required
							/>
						</SimpleFormItem>
					</div>
					<SimpleFormItem
						id="description"
						label={{ text: t("budgets.budget_description"), required: false }}
					>
						<Textarea
							id="description"
							name="description"
							value={form.description}
							onChange={(e) =>
								setForm((f) => ({ ...f, description: e.target.value }))
							}
						/>
					</SimpleFormItem>
					{message && (
						<Alert variant="default">
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription>{message}</AlertDescription>
						</Alert>
					)}
					<Button type="submit" disabled={isPending}>
						<Save className="mr-2 h-4 w-4" />
						{form.id ? t("shared.update") : t("shared.save")}
					</Button>
					{form.id && (
						<Button
							type="button"
							variant="outline"
							onClick={() => setForm({ name: "", description: "", type: 1 })}
						>
							{t("shared.cancel")}
						</Button>
					)}
				</form>
				<div className="space-y-2">
					{isLoading ? (
						<div>Loading...</div>
					) : categories.length === 0 ? (
						<div>{t("shared.noResults")}</div>
					) : (
						categories.map((cat) => (
							<div
								key={cat.id}
								className="flex items-center gap-2 border-b py-2"
							>
								<div className="flex-1">
									<div className="font-medium">{cat.name}</div>
									<div className="text-xs text-muted-foreground">
										{cat.description}
									</div>
									<div className="text-xs text-muted-foreground">
										Type: {cat.type}
									</div>
								</div>
								<Button
									size="sm"
									variant="outline"
									onClick={() => handleEdit(cat)}
								>
									{t("shared.update")}
								</Button>
								<Button
									size="sm"
									variant="destructive"
									onClick={() => handleDelete(cat.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
};

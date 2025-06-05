"use server";

import {
	createCategory,
	deleteCategory,
	updateCategory,
} from "@/features/budget/api/categories";
import { roleGuard } from "@/features/budget/authorization/roleGuard";
import type {
	CategoryActionResponse,
	CategoryFormData,
} from "@/features/budget/models/category";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const categorySchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1),
	description: z.string().optional(),
	budgetId: z.string(),
	type: z.number(),
});

export async function createCategoryAction(
	prevState: CategoryActionResponse | null,
	formData: FormData,
): Promise<CategoryActionResponse> {
	try {
		const t = await getTranslations();
		const data = Object.fromEntries(
			formData.entries(),
		) as unknown as CategoryFormData;
		console.log(data);
		const canUpdate = await roleGuard({
			id: data.id as string,
			requiredRole: "Owner",
		});
		if (!canUpdate) {
			return {
				success: false,
				message: t("validation.notAllowed"),
				inputs: data,
			};
		}

		const validated = categorySchema.omit({ id: true }).safeParse(data);
		if (!validated.success) {
			return {
				success: false,
				message: "Invalid data",
				errors: validated.error.flatten().fieldErrors,
				inputs: data,
			};
		}
		await createCategory(validated.data);
		revalidateTag(`categories-${validated.data.budgetId}`);
		return {
			success: true,
			message: "Category created!",
			inputs: validated.data,
		};
	} catch (e) {
		return { success: false, message: "Unexpected error" };
	}
}

export async function updateCategoryAction(
	prevState: CategoryActionResponse | null,
	formData: FormData,
): Promise<CategoryActionResponse> {
	try {
		const data = Object.fromEntries(
			formData.entries(),
		) as unknown as CategoryFormData;
		const validated = categorySchema.safeParse(data);
		if (!validated.success) {
			return {
				success: false,
				message: "Invalid data",
				errors: validated.error.flatten().fieldErrors,
				inputs: data,
			};
		}
		await updateCategory(validated.data);
		revalidateTag(`categories-${validated.data.budgetId}`);
		return {
			success: true,
			message: "Category updated!",
			inputs: validated.data,
		};
	} catch (e) {
		return { success: false, message: "Unexpected error" };
	}
}

export async function deleteCategoryAction(id: string, budgetId: string) {
	try {
		await deleteCategory(id);
		revalidateTag(`categories-${budgetId}`);
		return { deleted: true };
	} catch (e) {
		return { deleted: false };
	}
}

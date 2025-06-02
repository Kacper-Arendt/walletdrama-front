"use server";

import { isOwnerAction } from "@/features/budget/actions/isOwner.action";
import { updateBudget } from "@/features/budget/api/updateBudget";
import { getTranslations } from "next-intl/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import type {
	BudgetDetailsFormData,
	UpdateDataActionResponse,
} from "../models/budget";

export async function updateBudgetDetails(
	prevState: UpdateDataActionResponse | null,
	formData: FormData,
): Promise<UpdateDataActionResponse> {
	const t = await getTranslations();
	const rawData: BudgetDetailsFormData = {
		id: formData.get("id") as string,
		name: formData.get("name") as string,
		description: formData.get("description") as string,
	};

	const canUpdate = await isOwnerAction(rawData.id);
	if (!canUpdate) {
		return {
			success: false,
			message: t("validation.notAllowed"),
			inputs: rawData,
		};
	}

	const schema = z.object({
		id: z.string(),
		name: z.string().min(3, t("validation.required")),
		description: z.string().optional(),
	});

	try {
		const validatedData = schema.safeParse(rawData);

		if (!validatedData.success) {
			return {
				success: false,
				message: t("validation.errorForm"),
				errors: validatedData.error.flatten().fieldErrors,
				inputs: rawData,
			};
		}

		await updateBudget({
			id: validatedData.data.id,
			name: validatedData.data.name,
			description: validatedData.data?.description ?? "",
		});

		revalidateTag(`budget-${rawData.id}`);

		return {
			success: true,
			message: t("validation.success"),
			inputs: rawData,
		};
	} catch (error) {
		return {
			success: false,
			message: t("validation.unexpectedError"),
		};
	}
}

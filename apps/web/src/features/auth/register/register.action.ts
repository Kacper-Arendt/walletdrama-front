"use server";
import { register } from "features/auth/register/register.api";
import type {
	ActionResponse,
	RegisterUserPayload,
} from "features/auth/register/types";
import { getLangServer } from "i18n/getLangServer";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function registerUser(
	_: ActionResponse | null,
	formData: FormData,
): Promise<ActionResponse> {
	try {
		const rawData: RegisterUserPayload = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const locale = await getLangServer();
		const t = await getTranslations({ locale, namespace: "Register" });

		const validateData = schema.safeParse(rawData);

		if (!validateData.success) {
			return {
				success: false,
				message: t("registration_failed"),
				errors: validateData.error.flatten().fieldErrors,
				inputs: rawData,
			};
		}

		const response = await register(validateData.data);

		if (response.ok) {
			return {
				success: true,
				message: t("registration_successful"),
			};
		}
		const responseData = await response.json();

		if (responseData.code === "user_creation_failed") {
			return {
				success: false,
				message: t("email_already_exists"),
				inputs: rawData,
			};
		}

		return {
			success: false,
			message: t("registration_failed"),
			inputs: rawData,
		};
	} catch (e) {
		const locale = await getLangServer();
		const t = await getTranslations({ locale, namespace: "Register" });

		return {
			success: false,
			message: t("registration_failed"),
		};
	}
}

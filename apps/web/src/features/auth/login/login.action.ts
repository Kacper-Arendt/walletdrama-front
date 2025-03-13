"use server";
import { handleTokens } from "auth/handleTokens";
import { login } from "features/auth/login/login.api";
import type {
	ActionResponse,
	LoginResponse,
	LoginUserPayload,
} from "features/auth/login/types";
import { getLangServer } from "i18n/getLangServer";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string(),
});

export async function loginUser(
	_: ActionResponse | null,
	formData: FormData,
): Promise<ActionResponse> {
	let redirectPath: string | null = null;

	try {
		const rawData: LoginUserPayload = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const locale = await getLangServer();
		const t = await getTranslations({ locale, namespace: "Register" });

		const validateData = schema.safeParse(rawData);

		if (!validateData.success) {
			return {
				success: false,
				message: t("login_failed"),
				errors: validateData.error.flatten().fieldErrors,
				inputs: rawData,
			};
		}

		const response = await login(validateData.data);

		if (!response.ok) {
			return {
				success: false,
				message: t("login_failed"),
				inputs: rawData,
			};
		}
		const responseData: LoginResponse = await response.json();
		await handleTokens(responseData);

		redirectPath = "/system";

		return {
			success: true,
			message: "",
		};
	} catch (e) {
		console.log(e);
		const locale = await getLangServer();
		const t = await getTranslations({ locale, namespace: "Login" });

		return {
			success: false,
			message: t("login_failed"),
		};
	} finally {
		if (redirectPath) redirect(redirectPath);
	}
}

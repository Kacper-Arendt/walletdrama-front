import { register } from "@/features/auth/register/register.api";
import type { RegisterUserPayload } from "@/features/auth/register/types";
import { toast } from "@ui/components/ui/sonner";
import { useTranslations } from "next-intl";

export const useRegister = () => {
	const t = useTranslations();

	const registerUser = async (data: RegisterUserPayload) => {
		try {
			const resp = await register(data);

			if (resp.status === 200) {
				return toast.success(t("register.success"));
			}

			if (resp.status === 400) {
				const data = await resp.json();
				console.log(data);

				if (
					data?.errors?.DuplicateUserName ||
					data?.code === "user_creation_failed"
				) {
					return toast.error(t("register.email_already_exists"));
				}
				return toast.error(t("register.fail"));
			}
		} catch (e) {
			toast.error(t("register.fail"));
		}
	};

	return { registerUser };
};

import { login } from "@/features/auth/login/login.api";
import type {
	// LoginResponse,
	LoginUserPayload,
} from "@/features/auth/login/types.ts";
import { toast } from "@ui/components/ui/sonner";
// import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslations } from "next-intl";

export const useLogin = () => {
	const t = useTranslations();

	const loginUser = async (data: LoginUserPayload) => {
		try {
			const resp = await login(data);

			if (resp.ok) {
				return null;
			}

			if (resp.status === 401) {
				return toast.error(t("login.invalid_credentials"));
			}
		} catch (e) {
			console.log(e);
			toast.error(t("login.fail"));
		}
	};

	return { loginUser };
};

import type { IUser } from "@/features/auth/session/types.ts";
import api from "@/utils/api.ts";

export const getUser = async () => {
	return await api<IUser>("api/auth/me", {
		method: "GET",
	});
};

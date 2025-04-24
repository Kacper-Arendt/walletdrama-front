import type { IUser } from "@/features/auth/session/types";
import api from "@/utils/api";

export const getUser = async () => {
	return await api<IUser>("api/auth/me", {
		method: "GET",
	});
};

export const logout = async () => {
	await api("api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

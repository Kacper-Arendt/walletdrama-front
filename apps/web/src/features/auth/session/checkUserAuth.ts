import { apiConfig } from "@/config/app";
import type { IUser } from "@/features/auth/session/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getAuth = cache(async () => {
	const cookieStore = await cookies();
	const identity = cookieStore.get(".AspNetCore.Identity.Application");

	if (!identity) {
		return { user: null, isAuthenticated: false };
	}

	const resp = await fetch(`${apiConfig.baseUrl}/api/auth/me`, {
		method: "GET",
		headers: {
			Cookie: `${identity.name}=${identity.value}`,
		},
	});

	if (resp.ok) {
		const user: IUser = await resp.json();

		return { user, isAuthenticated: !!user.id };
	}

	return { user: null, isAuthenticated: false };
});

export const getAuthOrRedirect = async () => {
	const auth = await getAuth();

	if (!auth.isAuthenticated) {
		redirect("/login");
	}

	return auth;
};

"use server";

import { login } from "@/features/auth/login/login.api";
import type { LoginUserPayload } from "@/features/auth/login/types";
import { redirect } from "next/navigation";

export interface ResponseStatus {
	status: "invalid_credentials" | "login_failed" | "locked_out";
}

export async function loginUser(
	data: LoginUserPayload,
): Promise<ResponseStatus> {
	const resp = await login(data);

	if (resp.ok) {
		redirect("/");
	}

	const jsonData = await resp.json();
	if (resp.status === 401) {
		if (jsonData?.detail === "LockedOut") return { status: "locked_out" };

		return { status: "invalid_credentials" };
	}

	return { status: "login_failed" };
}

import { refreshTokenAction } from "auth/refreshTokenAction";
import type { LoginResponse } from "features/auth/login/types";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const prepareTokens = (tokens: LoginResponse) => {
	const expiresInMilliseconds = tokens.expiresIn * 1000;
	const adjustedExpiresInMilliseconds = expiresInMilliseconds * 0.9;
	const expires = new Date(Date.now() + adjustedExpiresInMilliseconds);

	const token = `${tokens.tokenType} ${tokens.accessToken}`;

	const cookieOptions: Partial<ResponseCookie> = {
		httpOnly: true,
		expires,
		secure: true,
		path: "/",
		sameSite: "strict",
	};

	return { token, expires, refreshToken: tokens.refreshToken, cookieOptions };
};

export const handleTokens = async (tokens: LoginResponse) => {
	const cookieStore = await cookies();
	const { token, refreshToken, expires, cookieOptions } = prepareTokens(tokens);

	cookieStore.set("token", token, { ...cookieOptions });
	cookieStore.set("refreshToken", refreshToken, { ...cookieOptions });
	cookieStore.set("expiresIn", expires.toString(), { ...cookieOptions });
};

export async function getAuthTokens() {
	const cookiesStore = await cookies();
	const token = cookiesStore.get("token")?.value;
	const refreshToken = cookiesStore.get("refreshToken")?.value;
	const expiresIn = cookiesStore.get("expiresIn")?.value;

	return { token, refreshToken, expiresIn };
}

export function shouldRefreshToken({
	refreshToken,
	expiresIn,
}: { refreshToken: string; expiresIn: string }): boolean {
	if (!refreshToken) return false;
	if (!expiresIn) return true;

	const expires = new Date(expiresIn);
	const now = new Date();
	const timeLeft = 20 * 60 * 1000; // 20 minutes in milliseconds

	return expires.getTime() - now.getTime() < timeLeft;
}

export const updateSession = async (req: NextRequest) => {
	const refreshToken = req.cookies.get("refreshToken")?.value;

	const res = NextResponse.next();
	if (!refreshToken) return res;

	const expiresIn = req.cookies.get("expiresIn")?.value ?? "";
	const canRefresh = shouldRefreshToken({ refreshToken, expiresIn });

	if (canRefresh) {
		const refreshedTokens = await refreshTokenAction(refreshToken);

		if (!refreshedTokens) return res;

		const tokens = prepareTokens(refreshedTokens);

		console.log("[INFO] Setting new tokens", tokens);
		res.cookies.set("token", tokens.token, { ...tokens.cookieOptions });
		res.cookies.set("refreshToken", tokens.refreshToken, {
			...tokens.cookieOptions,
		});
		res.cookies.set("expiresIn", tokens.expires.toString(), {
			...tokens.cookieOptions,
		});
	}
	return res;
};

import { updateSession } from "auth/handleTokens";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const session = await updateSession(req);

	return session;
}

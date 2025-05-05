import { cookies } from "next/headers";

export const getSessionCookie = async () => {
	const cookieStore = await cookies();
	const identity = cookieStore.get(".AspNetCore.Identity.Application");

	if (!identity) {
		return null;
	}

	return {
		name: identity.name,
		value: identity.value,
		sessionCookie: `${identity.name}=${identity.value}`,
	};
};

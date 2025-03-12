import { cookies } from "next/headers";

export const getLangServer = async () => {
	const cookieStore = await cookies();
	return cookieStore.get("NEXT_LOCALE") || "en";
};

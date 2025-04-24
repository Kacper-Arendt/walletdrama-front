import { apiConfig } from "@/config/app";

export default async function api<T>(
	url: string,
	options: RequestInit,
): Promise<T> {
	const response = await fetch(`${apiConfig.baseUrl}/${url}`, {
		...options,
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error(
			`API Error: ${response.status} ${response.statusText} ${response.url}`,
		);
	}

	return await response.json().catch((err) => null);
}

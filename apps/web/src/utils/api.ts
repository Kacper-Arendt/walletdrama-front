import { apiConfig } from "@/config/app";
import { queryClient } from "@/integrations/tanstack-query/root-provider.tsx";
import { router } from "@/main.tsx";

export default async function api<T>(
	url: string,
	options: RequestInit,
): Promise<T> {
	const response = await fetch(`${apiConfig.baseUrl}/${url}`, {
		...options,
		credentials: "include",
	});

	if (!response.ok) {
		if (response.status === 401) {
			console.log("Unauthorized");
			await queryClient.invalidateQueries({ queryKey: ["session"] });
			await router.invalidate().finally(() => {
				router.navigate({ to: "/login" });
			});
		} else {
			throw new Error(
				`API Error: ${response.status} ${response.statusText} ${response.url}`,
			);
		}
	}

	return await response.json();
}

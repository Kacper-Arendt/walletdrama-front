import { apiClient } from "utils/client";

export default async function Home() {
	const x = await apiClient("api/users/auth/me", { method: "GET" });
	console.log(x.json);

	return <>{JSON.stringify(x.json)}</>;
}

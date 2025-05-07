"use server";
import { createTeam } from "@/features/teams/api/createTeam";
import { revalidateTag } from "next/cache";

export async function createTeamAction(name: string) {
	try {
		const res = await createTeam({ name });
		if (res.id) {
			revalidateTag("teams");
			return res;
		}
	} catch (error) {
		return null;
	}
}

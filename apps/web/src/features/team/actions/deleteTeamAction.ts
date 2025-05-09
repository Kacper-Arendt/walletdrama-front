"use server";
import { deleteTeam } from "@/features/team/api/deleteTeam";
import { roleGuard } from "@/features/team/authorization/roleGuard";
import { revalidateTag } from "next/cache";

export const deleteTeamAction = async (id: string) => {
	try {
		const canDelete = await roleGuard({ teamId: id, requiredRole: "Owner" });

		if (!canDelete) return null;

		const res = await deleteTeam(id);

		if (res.deleted) {
			revalidateTag("teams");
			return res;
		}
	} catch (error) {
		return null;
	}
};

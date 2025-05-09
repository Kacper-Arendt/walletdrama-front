import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { getTeam } from "@/features/team/api/getTeam";
import type { MemberRole } from "@/features/team/types/team";

export const roleGuard = async ({
	requiredRole,
	teamId,
}: { requiredRole: MemberRole; teamId: string }) => {
	const { user } = await getAuthOrRedirect();

	const team = await getTeam(teamId);
	const member = team.members.find((m) => m.id === user?.id);

	if (!member) {
		return false;
	}

	const roleHierarchy: MemberRole[] = ["Viewer", "Member", "Admin", "Owner"];
	const userRoleIndex = roleHierarchy.indexOf(member.role);
	const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

	if (userRoleIndex < requiredRoleIndex) {
		return false;
	}

	return true;
};

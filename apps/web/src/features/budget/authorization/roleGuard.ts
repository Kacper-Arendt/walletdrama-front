import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { getBudget } from "@/features/budget/api/getBudget";

type MemberRole = "Viewer" | "Member" | "Admin" | "Owner";

export const roleGuard = async ({
	requiredRole,
	id,
}: { requiredRole: MemberRole; id: string }) => {
	const { user, isAuthenticated } = await getAuthOrRedirect();

	const budget = await getBudget(id);

	if (!budget || !isAuthenticated) {
		return false;
	}

	if (budget.ownerId !== user?.id) {
		return false;
	}

	// const roleHierarchy: MemberRole[] = ["Viewer", "Member", "Admin", "Owner"];
	// const userRoleIndex = roleHierarchy.indexOf(member.role);
	// const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

	// if (userRoleIndex < requiredRoleIndex) {
	// 	return false;
	// }

	return true;
};

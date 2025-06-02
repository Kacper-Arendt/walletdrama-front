import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { getBudget } from "@/features/budget/api/getBudget";

export const isOwnerAction = async (id: string) => {
	const auth = await getAuthOrRedirect();
	const budget = await getBudget(id);

	if (!budget || !auth.isAuthenticated) return false;

	return budget.ownerId === auth?.user?.id;
};

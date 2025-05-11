import { getTeam } from "@/features/team/api/getTeam";
import { roleGuard } from "@/features/team/authorization/roleGuard";
import { MembersTable } from "@/features/team/components/members/MembersTable";

export const Members = async ({ teamId }: { teamId: string }) => {
	const team = await getTeam(teamId);
	const isOwner = await roleGuard({ teamId, requiredRole: "Owner" });

	return (
		<>
			<MembersTable data={team?.members ?? []} isOwner={isOwner} />
		</>
	);
};

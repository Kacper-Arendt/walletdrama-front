import { getTeam } from "@/features/team/api/getTeam";
import { roleGuard } from "@/features/team/authorization/roleGuard";
import { InviteUser } from "@/features/team/components/members/InviteUser";
import { MembersTable } from "@/features/team/components/members/MembersTable";

export const Members = async ({ teamId }: { teamId: string }) => {
	const team = await getTeam(teamId);
	const isOwner = await roleGuard({ teamId, requiredRole: "Owner" });

	return (
		<div className="flex flex-col gap-2 items-start">
			{isOwner && <InviteUser />}
			<MembersTable data={team?.members ?? []} isOwner={isOwner} />
		</div>
	);
};

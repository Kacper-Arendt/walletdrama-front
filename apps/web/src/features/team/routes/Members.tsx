import { getTeam } from "@/features/team/api/getTeam";
import { MembersTable } from "@/features/team/components/members/MembersTable";

export const Members = async ({ teamId }: { teamId: string }) => {
	const team = await getTeam(teamId);

	return (
		<>
			<MembersTable data={team?.members ?? []} />
		</>
	);
};

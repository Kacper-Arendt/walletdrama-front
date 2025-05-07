import { getTeams } from "@/features/teams/api/getTeams";
import { TeamList } from "@/features/teams/components/TeamList";
import { TeamListHeader } from "@/features/teams/components/TeamListHeader";

export default async function Teams() {
	const teams = await getTeams();

	return (
		<>
			<TeamListHeader />
			<TeamList data={teams} />
		</>
	);
}

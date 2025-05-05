import { getTeams } from "@/features/teams/api/getTeams";
import { TeamList } from "@/features/teams/components/TeamList";

export default async function Teams() {
	const teams = await getTeams();

	return (
		<>
			<TeamList data={teams} />
		</>
	);
}

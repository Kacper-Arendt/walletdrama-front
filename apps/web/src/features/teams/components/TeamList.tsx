import { TeamListItem } from "@/features/teams/components/TeamListItem";
import type { Teams } from "@/features/teams/types/teams";

interface TeamList {
	data: Teams[];
}

export function TeamList({ data }: TeamList) {
	return (
		<ul className="flex flex-col gap-3 w-full py-3">
			{data.map((team) => (
				<TeamListItem key={team.id} {...team} />
			))}
		</ul>
	);
}

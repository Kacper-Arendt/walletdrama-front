import { TeamListItem } from "@/features/teams/components/TeamListItem";
import type { Teams } from "@/features/teams/types/teams";
import { getTranslations } from "next-intl/server";

interface TeamList {
	title?: string;
	data: Teams[];
}

export async function TeamList({ data }: TeamList) {
	const t = await getTranslations("teams");

	return (
		<div>
			<h2 className="text-2xl font-bold text-foreground">{t("your_teams")}</h2>
			<ul className="flex flex-col gap-3 w-full py-3">
				{data.map((team) => (
					<TeamListItem key={team.id} {...team} />
				))}
			</ul>
		</div>
	);
}

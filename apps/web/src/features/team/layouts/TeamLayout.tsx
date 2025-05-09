import { NavLink } from "@/components/links/NavLink";
import { getTeam } from "@/features/team/api/getTeam";
import { Typography } from "@ui/components/ui/Typography";
import type { ReactNode } from "react";

export const TeamLayout = async ({
	children,
	teamId,
}: { children: ReactNode; teamId: string }) => {
	const team = await getTeam(teamId);

	return (
		<div className="flex flex-col gap-2">
			<Typography variant="title">{team.name}</Typography>
			<div className="flex items-center gap-2">
				<NavLink href={`/teams/${team.id}`} className="">
					Main
				</NavLink>
				<NavLink href={`/teams/${team.id}/members`}>Members</NavLink>
				<NavLink href={`/teams/${team.id}/settings`}>Settings</NavLink>
			</div>
			<div>{children}</div>
		</div>
	);
};

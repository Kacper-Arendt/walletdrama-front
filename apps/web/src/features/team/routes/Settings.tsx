import { roleGuard } from "@/features/team/authorization/roleGuard";
import { DeleteTeam } from "@/features/team/components/DeleteTeam";
import { Typography } from "@ui/components/ui/Typography";
import { getTranslations } from "next-intl/server";

export const Settings = async ({ teamId }: { teamId: string }) => {
	const t = await getTranslations("team");
	const canDeleteTeam = await roleGuard({ teamId, requiredRole: "Owner" });

	return (
		<div>
			<div className="flex flex-col gap-2 items-start">
				<Typography variant="heading">{t("danger_zone")}</Typography>
				{canDeleteTeam && <DeleteTeam id={teamId} />}
			</div>
		</div>
	);
};

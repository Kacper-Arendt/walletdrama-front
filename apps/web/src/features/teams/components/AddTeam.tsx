"use client";

import { createTeamAction } from "@/features/teams/actions/createTeamAction";
import { Button } from "@ui/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/ui/dialog";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { toast } from "@ui/components/ui/sonner";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export const AddTeam = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		startTransition(() => {
			(async () => {
				try {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const name = formData.get("name") as string;

					const res = await createTeamAction(name);
					if (res?.id) toast.success(t("teams.create_success"));
					else toast.error(t("teams.create_error"));
				} catch (error) {
					toast.error(t("teams.create_error"));
				}
			})();
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">{t("teams.create_team")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("teams.create_team")}</DialogTitle>
					<DialogDescription>
						{t("teams.create_team_description")}{" "}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								{t("teams.team_name")}
							</Label>
							<Input
								id="name"
								name="name"
								className="col-span-3"
								minLength={3}
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">
							{t(isPending ? "shared.loading" : "shared.save")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

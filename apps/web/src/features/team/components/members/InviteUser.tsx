"use client";

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

export const InviteUser = () => {
	const t = useTranslations();
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			(async () => {
				try {
					const formData = new FormData(e.currentTarget);
					const email = formData.get("email") as string;

					// Simulate API call to invite user
					// await inviteUserAction(email);
					toast.success(t("team.invite_success"));
				} catch (error) {
					toast.error(t("team.invite_error"));
				}
			})();
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" className="">
					{t("team.invite_user")}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("team.invite_user")}</DialogTitle>
					<DialogDescription>
						{t("team.invite_user_description")}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								{t("shared.email")}
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								className="col-span-3"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isPending}>
							{isPending ? t("shared.loading") : t("shared.submit")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

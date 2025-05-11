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
import { Label } from "@ui/components/ui/label";
import { toast } from "@ui/components/ui/sonner";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

interface ChangeRoleModalProps {
	memberId: string;
	currentRole: string;
}

export const ChangeRoleModal = ({
	memberId,
	currentRole,
}: ChangeRoleModalProps) => {
	const t = useTranslations();
	const [newRole, setNewRole] = useState(currentRole);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startTransition(() => {
			(async () => {
				try {
					// await onRoleChange(memberId, newRole);
					toast.success(t("team.role_change_success"));
				} catch (error) {
					toast.error(t("team.role_change_error"));
				}
			})();
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					title={t("team.change_role")}
					aria-label={t("team.change_role")}
					className="text-sm text-gray-900"
				>
					<Pen />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("team.change_role")}</DialogTitle>
					<DialogDescription>
						{t("team.change_role_description")}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="role" className="text-right">
								{t("shared.role")}
							</Label>
							<select
								id="role"
								name="role"
								value={newRole}
								onChange={(e) => setNewRole(e.target.value)}
								className="col-span-3 rounded-md border border-border p-2 text-sm text-gray-900 focus:border-foreground focus:ring-foreground"
							>
								<option value="Owner">{t("team.roles.owner")}</option>
								<option value="Admin">{t("team.roles.admin")}</option>
								<option value="Member">{t("team.roles.member")}</option>
								<option value="Viewer">{t("team.roles.viewer")}</option>
							</select>
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

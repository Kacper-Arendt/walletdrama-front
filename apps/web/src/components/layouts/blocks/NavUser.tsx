"use client";

import { logout } from "@/features/auth/session/api";
import {
	type NavUserProps,
	NavUser as UiNavUser,
} from "@ui/components/nav-user";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const NavUser = ({ name }: { name: string }) => {
	const t = useTranslations();
	const router = useRouter();

	const onLogout = async () => {
		await logout();
		router.push("/login");
	};

	const dropdown: NavUserProps["dropdown"] = [
		{ id: 0, text: t("shared.logout"), icon: LogOut, onClick: onLogout },
	];

	return (
		<UiNavUser
			user={{
				name,
				avatar:
					"https://images.unsplash.com/photo-1713176960142-d67c7b669896?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			}}
			dropdown={dropdown}
		/>
	);
};

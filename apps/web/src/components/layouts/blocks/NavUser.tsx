"use client";

import { logout } from "@/features/auth/session/api";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const NavUser = ({ user }: { user: { name: string } }) => {
	const t = useTranslations();
	const router = useRouter();

	const onLogout = async () => {
		await logout();
		router.push("/login");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					title={t("shared.openMenu")}
					aria-label={t("shared.openMenu")}
				>
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage
							src="https://images.unsplash.com/photo-1713176960142-d67c7b669896?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt={user.name}
						/>
						<AvatarFallback>{user.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>{t("shared.my_account")}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onLogout}>
					<LogOut /> {t("shared.logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

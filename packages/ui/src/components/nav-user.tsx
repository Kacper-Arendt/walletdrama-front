"use client";

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@ui/components/ui/sidebar";
import type { ReactNode } from "react";

export interface NavUserProps {
	user: {
		name: string;
		avatar: string;
	};
	dropdown?: {
		id: string;
		text: string;
		icon?: ReactNode;
		onClick: () => void;
	}[];
}

export function NavUser({ user, dropdown }: Props) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					{dropdown?.length > 0 && (
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							{dropdown.map((item) => (
								<DropdownMenuItem key={item.id} onClick={item.onClick}>
									{item.icon && <item.icon className="mr-2 h-4 w-4" />}
									{item.text}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					)}
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

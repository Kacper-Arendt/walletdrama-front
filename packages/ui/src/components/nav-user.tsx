"use client";

import { ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { createElement } from "react";

export interface NavUserProps {
	user: {
		name: string;
		avatar?: string;
	};
	dropdown?: {
		id: string;
		text: string;
		icon?: React.ComponentType<{ className?: string }>;
		onClick: () => void;
	}[];
}

export function NavUser({ user, dropdown }: NavUserProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">CN</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			{dropdown && dropdown?.length > 0 && (
				<DropdownMenuContent
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
					side={"bottom"}
					align="end"
					sideOffset={4}
				>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.name}</span>
					</div>
					{dropdown.map((item) => (
						<DropdownMenuItem key={item.id} onClick={item.onClick}>
							{item.icon &&
								createElement(item.icon, { className: "mr-2 h-4 w-4" })}
							{item.text}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}

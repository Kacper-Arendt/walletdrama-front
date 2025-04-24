import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@ui/components/ui/sidebar";
import { Building2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const Nav = async () => {
	const t = await getTranslations("pages");

	const items = [{ url: "/", title: t("teams"), icon: Building2 }];

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={item.url}>
								{item.icon && <item.icon size={18} />}
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

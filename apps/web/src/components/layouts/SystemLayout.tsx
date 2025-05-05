import { Nav } from "@/components/layouts/blocks/Nav";
import { NavUser } from "@/components/layouts/blocks/NavUser";
import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { Separator } from "@ui/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@ui/components/ui/sidebar";

const AppSidebar = async () => {
	const { user } = await getAuthOrRedirect();

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarContent>
				<Nav />
			</SidebarContent>
			<SidebarFooter>{user && <NavUser name={user?.name} />}</SidebarFooter>
		</Sidebar>
	);
};

export const SystemLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
				</header>
				<main className="p-3">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

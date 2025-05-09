import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { TeamLayout } from "@/features/team/layouts/TeamLayout";

export default async function MainLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}) {
	await getAuthOrRedirect();
	const { id } = await params;

	return <TeamLayout teamId={id}>{children}</TeamLayout>;
}

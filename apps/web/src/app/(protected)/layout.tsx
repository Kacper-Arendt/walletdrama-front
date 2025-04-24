import { SystemLayout } from "@/components/layouts/SystemLayout";
import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await getAuthOrRedirect();

	return <SystemLayout>{children}</SystemLayout>;
}

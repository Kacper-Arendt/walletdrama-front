import { Settings } from "@/features/team/routes/Settings";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <Settings teamId={id} />;
}

import { Members } from "@/features/team/routes/Members";

export default async function MembersPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <Members teamId={id} />;
}

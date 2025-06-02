// import type { Metadata } from "next";
// import { getTranslations } from "next-intl/server";
// import { titleGenerator } from "@/utils/titleGenerator";
import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { Budget } from "@/features/budget/routes/Budget";

// export async function generateMetadata(): Promise<Metadata> {
// 	const t = await getTranslations("pages");
//
// 	return {
// 		title: titleGenerator({ title: t("budgets") }),
// 	};
// }

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	await getAuthOrRedirect();

	return <Budget id={id} />;
}

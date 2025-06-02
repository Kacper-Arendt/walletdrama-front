import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import Budgets from "@/features/budgets/routes/Budgets";
import { titleGenerator } from "@/utils/titleGenerator";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("pages");

	return {
		title: titleGenerator({ title: t("budgets") }),
	};
}

export default async function Home() {
	await getAuthOrRedirect();

	return <Budgets />;
}

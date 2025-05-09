import Teams from "@/features/teams/routes/Teams";
import { titleGenerator } from "@/utils/titleGenerator";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("pages");

	return {
		title: titleGenerator({ title: t("teams") }),
	};
}

export default async function Home() {
	return <Teams />;
}

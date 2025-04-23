import Register from "@/features/auth/register/Register";
import { titleGenerator } from "@/utils/titleGenerator";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("pages");

	return {
		title: titleGenerator({ title: t("register") }),
	};
}

export default function Home() {
	return <Register />;
}

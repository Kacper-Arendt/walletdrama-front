import { Login } from "@/features/auth/login/Login";
import { titleGenerator } from "@/utils/titleGenerator";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("pages");

	return {
		title: titleGenerator({ title: t("login") }),
	};
}

export default function Home() {
	return <Login />;
}

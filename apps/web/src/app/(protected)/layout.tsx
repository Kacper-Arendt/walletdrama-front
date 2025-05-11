import {
	SystemHeader,
	type SystemHeaderProps,
} from "@/components/layouts/SystemHeader";
import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import { getTranslations } from "next-intl/server";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await getAuthOrRedirect();
	const t = await getTranslations("pages");

	const nav: SystemHeaderProps["nav"] = [
		{
			url: "/teams",
			title: t("teams"),
		},
	];

	return (
		<div>
			<SystemHeader nav={nav} />
			<main className="p-4">{children}</main>
		</div>
	);
}

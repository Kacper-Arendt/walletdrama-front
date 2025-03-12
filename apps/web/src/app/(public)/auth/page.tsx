import { Login } from "features/auth/login/Login";
import { getLangServer } from "i18n/getLangServer";
import { getTranslations } from "next-intl/server";
import { titleGenerator } from "utils/titleGenerator";

export async function generateMetadata() {
	const locale = await getLangServer();
	const t = await getTranslations({ locale, namespace: "Pages" });

	return {
		title: titleGenerator({ title: t("login") }),
	};
}

export default function Home() {
	return <Login />;
}

import Register from "features/auth/register/Register";
import { getLangServer } from "i18n/getLangServer";
import { getTranslations } from "next-intl/server";
import { titleGenerator } from "utils/titleGenerator";

export async function generateMetadata() {
	const locale = await getLangServer();
	const t = await getTranslations({ locale, namespace: "Pages" });

	return {
		title: titleGenerator({ title: t("register") }),
	};
}

export default function Home() {
	return <Register />;
}

import { getTranslations } from "next-intl/server";

export default async function Home() {
	const t = await getTranslations("pages");

	return <div className="">Protected return</div>;
}

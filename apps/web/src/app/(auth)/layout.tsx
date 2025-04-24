import { getAuth } from "@/features/auth/session/checkUserAuth";
import AuthLayout from "@/features/auth/shared/AuthLayout";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated } = await getAuth();

	if (isAuthenticated) {
		redirect("/");
	}

	return <AuthLayout>{children}</AuthLayout>;
}

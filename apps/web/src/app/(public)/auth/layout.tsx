import AuthLayout from "features/auth/shared/AuthLayout";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>;
}

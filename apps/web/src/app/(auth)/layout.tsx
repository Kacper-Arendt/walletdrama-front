import AuthLayout from "@/features/auth/shared/AuthLayout";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthLayout>{children}</AuthLayout>;
}

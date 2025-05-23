interface AuthLayoutProps {
	children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
	<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
		<div className="flex w-full max-w-sm flex-col gap-6 items-center">
			{children}
		</div>
	</div>
);

export default AuthLayout;

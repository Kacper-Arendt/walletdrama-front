import { cn } from "components/lib/utils";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface LoginFormProps {
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
	disabled?: boolean;
	loading?: boolean;
}

export function LoginForm({
	className,
	onSubmit,
	disabled,
	loading,
	...props
}: React.ComponentProps<"div"> & LoginFormProps) {
	const t = useTranslations("Login");
	const tShared = useTranslations("Shared");

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("welcome_back")}</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">{tShared("email")}</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">{tShared("password")}</Label>
										<Link
											href="/auth/forgot"
											className="ml-auto text-sm underline-offset-4"
										>
											{t("forgot_password")}
										</Link>
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full" disabled={disabled}>
									{tShared(loading ? "loading" : "login")}
								</Button>
							</div>
							<div className="text-center text-sm">
								{t("dont_have_an_account")}{" "}
								<Link
									href="/auth/register"
									className="underline underline-offset-4"
								>
									{tShared("register")}
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			{/*<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">*/}
			{/*	By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}*/}
			{/*	and <a href="#">Privacy Policy</a>.*/}
			{/*</div>*/}
		</div>
	);
}

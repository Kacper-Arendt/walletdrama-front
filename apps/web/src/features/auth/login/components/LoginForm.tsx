"use client";

import {
	type ResponseStatus,
	loginUser,
} from "@/features/auth/login/login.action";
import { login } from "@/features/auth/login/login.api";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItem from "@ui/components/formItem";
import { Button } from "@ui/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { Form, FormField } from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { toast } from "@ui/components/ui/sonner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().min(1),
	password: z.string().min(1),
});

export default function LoginForm() {
	const t = useTranslations();
	const [isSubmitting, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof schema>) {
		startTransition(async () => {
			// const resp = await loginUser(values);
			const resp = await login(values);

			if (resp.ok) {
				router.push("/");
			}

			// const statusMessages: Record<ResponseStatus["status"], string> = {
			// 	locked_out: t("login.locked_out"),
			// 	invalid_credentials: t("login.invalid_credentials"),
			// 	login_failed: t("login.fail"),
			// };
			//
			// if (statusMessages[resp?.status]) {
			// 	toast.error(
			// 		statusMessages[resp?.status] ?? statusMessages.login_failed,
			// 	);
			// }
		});
	}

	return (
		<div className="flex flex-col gap-6 w-full">
			<Card className="w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("login.welcome_back")}</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
							<div className="grid gap-6">
								<div className="grid gap-3">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem label={t("shared.email")} required>
												<Input
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem label={t("shared.password")} required>
												<Input type="password" {...field} />
											</FormItem>
										)}
									/>
									<Button type="submit" disabled={isSubmitting}>
										{t("shared.login")}
									</Button>
								</div>
								<div className="flex flex-col gap-3 items-center justify-center">
									{/*<Link*/}
									{/*	href="/auth/forgot"*/}
									{/*	className="text-sm underline underline-offset-4"*/}
									{/*>*/}
									{/*	{t("forgot_password")}*/}
									{/*</Link>*/}
									<div className="text-center text-sm">
										{t("login.dont_have_an_account")}{" "}
										<Link
											href="/register"
											className="underline underline-offset-4"
										>
											{t("shared.register")}
										</Link>
									</div>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

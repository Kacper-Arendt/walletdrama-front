"use client";

import { useLogin } from "@/features/auth/login/useLogin";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@ui/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { z } from "zod";

const schema = z.object({
	email: z.string().min(1),
	password: z.string().min(1),
});

export default function LoginForm() {
	const t = useTranslations();
	const { loginUser } = useLogin();

	// const form = useAppForm({
	// 	defaultValues: {
	// 		email: "",
	// 		password: "",
	// 	},
	// 	validators: {
	// 		onSubmit: schema,
	// 	},
	// 	onSubmit: async ({ value }) => {
	// 		await loginUser(value);
	// 	},
	// });

	return (
		<div className="flex flex-col gap-6 w-full">
			<Card className="w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("login.welcome_back")}</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							// form.handleSubmit();
						}}
						className="mt-5"
					>
						<div className="grid gap-6">
							<div className="grid gap-3">
								{/*<form.AppField name="email">*/}
								{/*	{(field) => (*/}
								{/*		<field.TextField*/}
								{/*			label={t("shared.email")}*/}
								{/*			type="email"*/}
								{/*			placeholder="m@example.com"*/}
								{/*		/>*/}
								{/*	)}*/}
								{/*</form.AppField>*/}

								{/*<form.AppField name="password">*/}
								{/*	{(field) => (*/}
								{/*		<field.TextField*/}
								{/*			label={t("shared.password")}*/}
								{/*			type="password"*/}
								{/*		/>*/}
								{/*	)}*/}
								{/*</form.AppField>*/}

								{/*<form.AppForm>*/}
								{/*	<form.SubmitButton label={t("shared.login")} />*/}
								{/*</form.AppForm>*/}
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
				</CardContent>
			</Card>
		</div>
	);
}

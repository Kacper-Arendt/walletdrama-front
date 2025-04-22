"use client";
import { useRegister } from "@/features/auth/register/useRegister";
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
	password: z.string().min(8),
});

export default function RegisterForm() {
	const t = useTranslations();
	const { registerUser } = useRegister();

	// const form = useAppForm({
	// 	defaultValues: {
	// 		email: "",
	// 		password: "",
	// 	},
	// 	validators: {
	// 		onSubmit: schema,
	// 	},
	// 	onSubmit: async ({ value }) => {
	// 		await registerUser(value);
	// 	},
	// });

	return (
		<div className="flex flex-col gap-6 w-full">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("register.hello")}</CardTitle>
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
								{/*		<field.PasswordField label={t("shared.password")} />*/}
								{/*	)}*/}
								{/*</form.AppField>*/}

								{/*<form.AppForm>*/}
								{/*	<form.SubmitButton label={t("shared.register")} />*/}
								{/*</form.AppForm>*/}
							</div>
							<div className="flex flex-col gap-3 items-center justify-center">
								<div className="text-center text-sm">
									{t("register.already_have_an_account")}{" "}
									<Link href="/login" className="underline underline-offset-4">
										{t("shared.login")}
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

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { loginUser } from "features/auth/login/login.action";
import type { ActionResponse } from "features/auth/login/types";
import { useTranslations } from "next-intl";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import { AlertDestructive } from "ui/alerts/AlertDestructive";
import { AlertInfo } from "ui/alerts/AlertInfo";
import { FormInput } from "ui/forms/fields/FormInput";
import { SubmitButton } from "ui/forms/fields/SubmitButton";

const initialValues: ActionResponse = {
	success: null,
	message: "",
};

export function LoginForm() {
	const t = useTranslations("Login");
	const tShared = useTranslations("Shared");
	const [state, action] = useActionState(loginUser, initialValues);

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("welcome_back")}</CardTitle>
				</CardHeader>
				<CardContent>
					{state?.success && <AlertInfo title={state.message} />}
					{state?.success === false && (
						<AlertDestructive title={state.message} />
					)}
					<Form action={action} className="mt-5">
						<div className="grid gap-6">
							<div className="grid gap-6">
								<FormInput
									id="email"
									label={tShared("email")}
									type="email"
									placeholder="m@example.com"
									required
									defaultValue={state?.inputs?.email}
									errors={state?.errors?.email}
								/>
								<FormInput
									id="password"
									label={tShared("password")}
									type="password"
									defaultValue={state?.inputs?.password}
									required
								/>
								<SubmitButton text={tShared("login")} />
							</div>
							<div className="flex flex-col gap-3 items-center justify-center">
								{/*<Link*/}
								{/*	href="/auth/forgot"*/}
								{/*	className="text-sm underline underline-offset-4"*/}
								{/*>*/}
								{/*	{t("forgot_password")}*/}
								{/*</Link>*/}
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
						</div>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

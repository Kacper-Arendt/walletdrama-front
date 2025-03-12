"use client";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import {
	type ActionResponse,
	registerUser,
} from "features/auth/register/actions/registerUser";
import { SubmitButton } from "features/auth/register/components/SubmitButton";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useActionState } from "react";
import { AlertDestructive } from "ui/alerts/AlertDestructive";
import { AlertInfo } from "ui/alerts/AlertInfo";
import { FormInput } from "ui/forms/fields/FormInput";

const initialValues: ActionResponse = {
	success: null,
	message: "",
};

export function RegisterForm() {
	const t = useTranslations("Register");
	const tShared = useTranslations("Shared");
	const [state, action] = useActionState(registerUser, initialValues);

	console.log("X", state);

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("hello")}</CardTitle>
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
								<SubmitButton />
							</div>
							<div className="text-center text-sm">
								{t("already_have_an_account")}{" "}
								<a href="/auth" className="underline underline-offset-4">
									{tShared("login")}
								</a>
							</div>
						</div>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

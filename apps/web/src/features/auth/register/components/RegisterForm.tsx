"use client";
import { PasswordRequirements } from "@/features/auth/register/components/PasswordRequirements";
import { useRegister } from "@/features/auth/register/useRegister";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().min(1),
	password: z.string().min(8),
});

export default function RegisterForm() {
	const t = useTranslations();
	const { registerUser } = useRegister();
	const [isSubmitting, startTransition] = useTransition();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof schema>) {
		startTransition(async () => {
			await registerUser(values);
		});
	}

	return (
		<div className="flex flex-col gap-6 w-full">
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t("register.hello")}</CardTitle>
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
											<>
												<FormItem label={t("shared.password")} required>
													<Input type="password" {...field} />
												</FormItem>
												<PasswordRequirements value={field.value} />
											</>
										)}
									/>
									<Button type="submit" disabled={isSubmitting}>
										{t("shared.register")}
									</Button>
								</div>
								<div className="flex flex-col gap-3 items-center justify-center">
									<div className="text-center text-sm">
										{t("register.already_have_an_account")}{" "}
										<Link
											href="/login"
											className="underline underline-offset-4"
										>
											{t("shared.login")}
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

import { lazy } from "react";

const RegisterForm = lazy(
	() => import("@/features/auth/register/components/RegisterForm"),
);

export default function Register() {
	return (
		<>
			{/*<Title>{titleGenerator({ title: t("pages.register") })}</Title>*/}
			<RegisterForm />
		</>
	);
}

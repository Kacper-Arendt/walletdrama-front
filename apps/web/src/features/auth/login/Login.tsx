import { lazy } from "react";

const LoginForm = lazy(
	() => import("@/features/auth/login/components/LoginForm"),
);

export const Login = () => {
	return <LoginForm />;
};

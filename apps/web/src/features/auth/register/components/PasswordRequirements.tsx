import { useTranslations } from "next-intl";

export const PasswordRequirements = ({ value }: { value: string }) => {
	const t = useTranslations();

	const hasLowercase = /[a-z]/.test(value);
	const hasUppercase = /[A-Z]/.test(value);
	const hasDigit = /\d/.test(value);
	const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

	return (
		<ul className="text-sm text-gray-500 mt-1">
			<li className={hasLowercase ? "text-lime-700" : "text-red-500"}>
				<strong>abc</strong> {t("register.password_requirements_lowercase")}
			</li>
			<li className={hasUppercase ? "text-lime-700" : "text-red-500"}>
				<strong>ABC</strong> {t("register.password_requirements_uppercase")}
			</li>
			<li className={hasDigit ? "text-lime-700" : "text-red-500"}>
				<strong>123</strong> {t("register.password_requirements_digit")}
			</li>
			<li className={hasSpecial ? "text-lime-700" : "text-red-500"}>
				<strong>!@#</strong> {t("register.password_requirements_special")}
			</li>
		</ul>
	);
};

import { Button } from "components/ui/button";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text }: { text?: string }) => {
	const tShared = useTranslations("Shared");
	const { pending } = useFormStatus();
	const buttonText = text || tShared("submit");

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{pending ? tShared("loading") : buttonText}
		</Button>
	);
};

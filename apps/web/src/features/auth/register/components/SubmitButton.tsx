import { Button } from "components/ui/button";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
	const tShared = useTranslations("Shared");
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{tShared(pending ? "loading" : "register")}
		</Button>
	);
};

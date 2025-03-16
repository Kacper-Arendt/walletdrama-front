import { Alert, AlertDescription, AlertTitle } from "@ui/components/ui/alert";
import { Terminal } from "lucide-react";

interface Props {
	className?: string;
	title?: string;
	description?: string;
}

export const AlertInfo = ({ className, description, title }: Props) => (
	<Alert className={className}>
		<Terminal className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		{description && <AlertDescription>{description}</AlertDescription>}
	</Alert>
);

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
	className?: string;
	title?: string;
	description?: string;
}

export const AlertDestructive = ({ className, description, title }: Props) => (
	<Alert variant="destructive" className={className}>
		<AlertCircle className="h-4 w-4" />
		{title && <AlertTitle>{title}</AlertTitle>}
		{description && <AlertDescription>{description}</AlertDescription>}
	</Alert>
);

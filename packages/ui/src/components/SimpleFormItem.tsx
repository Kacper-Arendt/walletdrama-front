import RequiredIndicator from "@ui/components/RequiredIndicator";
import { Label } from "@ui/components/ui/label";

interface SimpleFormItemProps {
	children: React.ReactNode;
	label?: {
		text: string;
		htmlFor: string;
		required?: boolean;
	};
}

export const SimpleFormItem = ({ label, children }: SimpleFormItemProps) => {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<Label htmlFor={label.htmlFor} className="text-right">
					{label.text}
					{label.required && <RequiredIndicator />}
				</Label>
			)}
			{children}
		</div>
	);
};

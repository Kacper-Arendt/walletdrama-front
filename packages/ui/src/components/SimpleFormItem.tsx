import RequiredIndicator from "@ui/components/RequiredIndicator";
import { Label } from "@ui/components/ui/label";

interface SimpleFormItemProps {
	id: string;
	children: React.ReactNode;
	label?: {
		text: string;
		required?: boolean;
	};
	errors?: string[] | null;
}

export const SimpleFormItem = ({
	label,
	children,
	errors,
	id,
}: SimpleFormItemProps) => {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<Label htmlFor={id} className="text-right">
					{label.text}
					{label.required && <RequiredIndicator />}
				</Label>
			)}
			{children}
			{errors?.map((err) => (
				<p key={err} id={`${id}-error`} className="text-sm text-red-500">
					{err}
				</p>
			))}
		</div>
	);
};

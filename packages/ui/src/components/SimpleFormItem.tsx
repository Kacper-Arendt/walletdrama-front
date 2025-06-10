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
	className?: string;
}

export const SimpleFormItem = ({
	label,
	children,
	errors,
	id,
	className,
}: SimpleFormItemProps) => {
	return (
		<div className={`flex flex-col gap-1 ${className || ""}`}>
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

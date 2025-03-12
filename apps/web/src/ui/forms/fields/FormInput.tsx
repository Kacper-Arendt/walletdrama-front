import { Input } from "components/ui/input";
import { Label } from "components/ui/label";

interface FormFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder?: string;
	required?: boolean;
	defaultValue?: string;
	errors?: string[];
}

export const FormInput = ({
	id,
	label,
	type,
	placeholder,
	required = false,
	defaultValue,
	errors = [],
}: FormFieldProps) => {
	return (
		<div className="grid gap-3">
			<Label htmlFor={id}>
				{label}
				{required && <span className="text-red-500">*</span>}
			</Label>
			<Input
				name={id}
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				defaultValue={defaultValue}
				aria-invalid={errors.length > 0}
				aria-describedby={errors.length > 0 ? `${id}-error` : undefined}
			/>
			{errors.map((err) => (
				<span
					key={err}
					id={`${id}-error`}
					role="alert"
					className="text-sm text-red-500"
				>
					{err}
				</span>
			))}
		</div>
	);
};

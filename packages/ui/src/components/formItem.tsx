import RequiredIndicator from "@ui/components/RequiredIndicator";
import {
	FormItem as BaseFormItem,
	FormControl,
	FormDescription,
	FormLabel,
	FormMessage,
} from "@ui/components/ui/form";

interface FormItemProps {
	label?: string;
	description?: string;
	children?: React.ReactNode;
	required?: boolean;
}

export default function FormItem({
	description,
	label,
	children,
	required,
}: FormItemProps) {
	return (
		<BaseFormItem className="flex w-full flex-col gap-n2">
			{label && (
				<FormLabel className="leading-5">
					{label}
					{required && <RequiredIndicator />}
				</FormLabel>
			)}
			<FormControl>{children}</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</BaseFormItem>
	);
}

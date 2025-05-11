import clsx from "clsx";
import type { JSX, ReactNode } from "react";

type TypographyProps = {
	variant: "title" | "subtitle" | "heading" | "body" | "caption" | "small";
	className?: string;
	children: ReactNode;
};

export const Typography = ({
	variant,
	className,
	children,
}: TypographyProps) => {
	const baseStyles: Record<TypographyProps["variant"], string> = {
		title: "text-2xl font-bold text-gray-900",
		subtitle: "text-xl font-semibold text-gray-800",
		heading: "text-xl font-medium text-gray-700",
		body: "text-base text-gray-600",
		caption: "text-sm text-gray-500",
		small: "text-xs text-gray-400",
	};

	const components: Record<
		TypographyProps["variant"],
		keyof JSX.IntrinsicElements
	> = {
		title: "h1",
		subtitle: "h2",
		heading: "h3",
		body: "p",
		caption: "span",
		small: "small",
	};

	const Component = components[variant];

	return (
		<Component className={clsx(baseStyles[variant], className)}>
			{children}
		</Component>
	);
};

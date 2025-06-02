import { cn } from "@ui/lib/utils";
import { type ComponentPropsWithoutRef, type JSX, createElement } from "react";

function createComponent<T extends keyof JSX.IntrinsicElements>(
	tag: T,
	defaultClassName: string,
) {
	return ({ className, children, ...props }: ComponentPropsWithoutRef<T>) =>
		createElement(
			tag,
			{ className: cn(defaultClassName, className), ...props },
			children,
		);
}

export const H1 = createComponent(
	"h1",
	"scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl",
);

export const H2 = createComponent(
	"h2",
	"scroll-m-20 border-b py-2 text-2xl font-semibold tracking-tight first:mt-0",
);

export const H3 = createComponent(
	"h3",
	"scroll-m-20 text-xl font-semibold tracking-tight",
);

export const H4 = createComponent(
	"h4",
	"scroll-m-20 text-xl font-semibold tracking-tight",
);

export const Lead = createComponent("p", "text-lg text-muted-foreground");

export const P = createComponent("p", "leading-7");

export const Large = createComponent("p", "text-lg");

export const Small = createComponent("p", "text-sm leading-none");

export const Muted = createComponent("span", "text-sm text-muted-foreground");

export const InlineCode = createComponent(
	"code",
	"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
);

export const MultilineCode = createComponent(
	"pre",
	"relative rounded bg-muted p-4 font-mono text-sm font-semibold overflow-x-auto",
);

export const List = createComponent("ul", "my-6 ml-6 list-disc [&>li]:mt-2");

export const Quote = createComponent(
	"blockquote",
	"mt-6 border-l-2 pl-6 italic text-muted-foreground",
);

export const Strong = createComponent("strong", "font-bold");

export const Em = createComponent("em", "italic");

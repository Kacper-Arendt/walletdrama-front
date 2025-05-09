import { cn } from "@ui/lib/utils";
import Link from "next/link";

type NavLinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
	isActive?: boolean;
};

export const NavLink = ({
	href,
	children,
	className,
	isActive,
}: NavLinkProps) => {
	return (
		<Link
			href={href}
			className={cn(
				"px-2 py-2 text-md font-medium border-b-2",
				isActive
					? "text-foreground border border-foreground"
					: "text-foreground/70 border-foreground/70 hover:border-foreground/90",
				className,
			)}
		>
			{children}
		</Link>
	);
};

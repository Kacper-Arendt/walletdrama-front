"use client";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	href: string;
	activeClassName?: string;
	className?: string;
	children: React.ReactNode;
}

const NavLink = ({
	children,
	href,
	activeClassName,
	className,
	...rest
}: NavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname.endsWith(href) && pathname !== "/";

	const activeClass = `text-foreground border-foreground ${activeClassName}`;

	return (
		<Link
			href={href}
			className={cn(
				"px-2 py-2 text-md font-medium border-b-2 text-foreground/70 border-transparent transition-colors hover:border-foreground/90 hover:text-foreground/90",
				isActive && activeClass,
				className,
			)}
			{...rest}
		>
			{children}
		</Link>
	);
};
export default NavLink;

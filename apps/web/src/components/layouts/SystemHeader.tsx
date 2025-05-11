import { NavUser } from "@/components/layouts/blocks/NavUser";
import { getAuthOrRedirect } from "@/features/auth/session/checkUserAuth";
import Link from "next/link";

export interface SystemHeaderProps {
	nav: {
		url: string;
		title: string;
	}[];
}

export const SystemHeader = async ({ nav }: SystemHeaderProps) => {
	const { user } = await getAuthOrRedirect();

	return (
		<header className="flex h-16 items-center justify-between border-b px-4">
			<div className="flex items-center">
				<nav>
					<ul className="flex space-x-4">
						{nav.map((item) => (
							<li key={item.title}>
								<Link href={item.url}>{item.title}</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="flex items-center">{user && <NavUser user={user} />}</div>
		</header>
	);
};

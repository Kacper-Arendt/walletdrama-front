import type { Teams } from "@/features/teams/types/teams";
import Link from "next/link";

export const TeamListItem = ({ id, name }: Teams) => (
	<li className="flex items-center justify-between p-4 border rounded-2xl border-gray-200">
		<div className="flex items-center">
			<span className="text-lg font-semibold">{name}</span>
		</div>
		<div className="flex items-center">
			<Link
				href={`teams/${id}`}
				className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Go
			</Link>
		</div>
	</li>
);

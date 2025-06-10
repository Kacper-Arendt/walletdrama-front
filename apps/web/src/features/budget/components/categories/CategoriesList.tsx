import type { Category } from "@/features/budget/api/categories";
import { Muted, P } from "@ui/components/typography";

export const CategoriesList = ({ list }: { list: Category[] }) => (
	<>
		{list?.map((cat) => (
			<div key={cat.id} className="flex items-center p-2 border-b w-full">
				<div className="flex flex-col">
					<P>{cat.name}</P>
					{cat?.description && <Muted>{cat.description}</Muted>}
				</div>
			</div>
		))}
	</>
);

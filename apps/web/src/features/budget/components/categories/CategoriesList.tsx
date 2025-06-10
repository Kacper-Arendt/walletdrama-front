import type { Category } from "@/features/budget/api/categories";
import { CategoryItemMenu } from "@/features/budget/components/categories/CategoryItemMenu";
import { Muted, P } from "@ui/components/typography";

export const CategoriesList = ({ list }: { list: Category[] }) => (
	<>
		{list?.map((cat) => (
			<div key={cat.id} className="flex items-center p-2 border-b w-full">
				<div className="flex flex-col flex-1">
					<P>{cat.name}</P>
					{cat?.description && <Muted>{cat.description}</Muted>}
				</div>
				<CategoryItemMenu {...cat} />
			</div>
		))}
	</>
);

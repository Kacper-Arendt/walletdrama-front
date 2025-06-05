import type { Category } from "@/features/budget/api/categories";
import { H4, Muted, P } from "@ui/components/typography";

export const CategoriesList = ({
	list,
	title,
}: { list: Category[]; title: string }) => {
	return (
		<div className="w-full md:max-w-xl">
			<H4>
				{title} ({list?.length ?? 0})
			</H4>
			{list?.map((cat) => (
				<div key={cat.id} className="flex items-center p-2 border-b w-full">
					<div className="flex flex-col">
						<P>{cat.name}</P>
						{cat?.description && <Muted>{cat.description}</Muted>}
					</div>
				</div>
			))}
		</div>
	);
};

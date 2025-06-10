"use client";

import type { Category } from "@/features/budget/api/categories";
import { Button } from "@ui/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { EllipsisVertical, PenLine, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { lazy, useState } from "react";

const UpdateCategory = lazy(
	() => import("@/features/budget/components/categories/UpdateCategory"),
);
const DeleteCategory = lazy(
	() => import("@/features/budget/components/categories/DeleteCategory"),
);

export const CategoryItemMenu = (category: Category) => {
	const t = useTranslations();
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						aria-label={t("shared.actions")}
						title={t("shared.actions")}
					>
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="start">
					<DropdownMenuItem onClick={() => setOpenEdit(true)}>
						<PenLine />
						{t("shared.update")}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-destructive"
						onClick={() => setOpenDelete(true)}
					>
						<Trash />
						{t("shared.delete")}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{openEdit && (
				<UpdateCategory
					data={category}
					open={openEdit}
					onOpenChange={setOpenEdit}
				/>
			)}

			{openDelete && (
				<DeleteCategory
					open={openDelete}
					onOpenChange={setOpenDelete}
					category={{
						id: category.id,
						budgetId: category.budgetId,
						name: category.name,
					}}
				/>
			)}
		</>
	);
};

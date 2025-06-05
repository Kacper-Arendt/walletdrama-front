import type { Category } from "@/features/budget/api/categories";
import type { ActionResponse } from "@/types/form";

export interface CategoryFormData extends Omit<Category, "id"> {
	id?: string;
}

export interface CategoryActionResponse
	extends ActionResponse<CategoryFormData> {}

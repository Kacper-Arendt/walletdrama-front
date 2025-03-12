export interface ActionFormType<T> {
	success: boolean | null;
	message: string;
	errors?: {
		[K in keyof T]?: string[];
	};
	inputs?: T;
}

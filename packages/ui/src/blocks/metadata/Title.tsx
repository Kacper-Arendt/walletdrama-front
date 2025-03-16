import type { ReactNode } from "react";

export const Title = ({ children }: { children: ReactNode }) => {
	return <title>{children}</title>;
};

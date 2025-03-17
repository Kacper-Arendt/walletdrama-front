import { LoadingSpinner } from "@ui/components/ui/LoadingSpinner";
import { type ReactNode, Suspense } from "react";

export const SuspenseWrapper = ({
	children,
	fallback = <LoadingSpinner />,
}: {
	children: ReactNode;
	fallback?: ReactNode;
}) => <Suspense fallback={fallback}>{children}</Suspense>;

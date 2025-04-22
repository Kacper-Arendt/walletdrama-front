import { getUser } from "@/features/auth/session/api.ts";
import type { IUser } from "@/features/auth/session/types.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";

export interface SessionContextValue {
	isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextValue | undefined>(
	undefined,
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const query = useSuspenseQuery<IUser>({
		queryKey: ["session"],
		queryFn: getUser,
	});

	console.log(query);

	const isAuthenticated = () => {
		console.log(query);
		if (query.isError) return false;
		if (query.isLoading) return false;
		return !!query.data;
	};

	return (
		<SessionContext.Provider
			value={{
				isAuthenticated: isAuthenticated() ?? false,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	console.log(context);

	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}

	return context;
};

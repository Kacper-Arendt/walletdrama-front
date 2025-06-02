"use client";

import { clearBudgetCache } from "@/features/budget/actions/clearBudgetCache.action";
import { H3, P } from "@ui/components/typography";
import { Button } from "@ui/components/ui/button";
import { CheckCircle2, Info, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

export function ClearBudgetCacheButton({ budgetId }: { budgetId: string }) {
	const t = useTranslations();
	const [success, setSuccess] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		setSuccess(false);
		startTransition(async () => {
			await clearBudgetCache(budgetId);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 2000);
		});
	};

	return (
		<div className="flex flex-col gap-2 items-start">
			<H3>{t("shared.cache_management")}</H3>
			<P className="flex gap-2 items-center">
				<Info className="h-4 w-4" />
				{t("shared.cache_clear_info")}
			</P>
			<Button
				variant="outline"
				onClick={handleClick}
				disabled={isPending}
				size="lg"
			>
				{isPending ? (
					<>
						<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
						{t("shared.clearing_cache")}
					</>
				) : success ? (
					<>
						<CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
						{t("shared.cache_cleared")}
					</>
				) : (
					<>
						<RefreshCw className="mr-2 h-4 w-4" />
						{t("shared.clear_cache")}
					</>
				)}
			</Button>
		</div>
	);
}

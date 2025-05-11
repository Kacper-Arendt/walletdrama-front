"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { ChangeRoleModal } from "@/features/team/components/members/ChangeRoleModal";
import type { TeamMember } from "@/features/team/types/team";
import { Typography } from "@ui/components/ui/Typography";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import { useTranslations } from "next-intl";

interface DataTableProps {
	data: TeamMember[];
	isOwner: boolean;
}

export function MembersTable({ data, isOwner }: DataTableProps) {
	const t = useTranslations();

	const columns: ColumnDef<TeamMember>[] = [
		{
			accessorKey: "email",
			header: t("shared.email"),
		},
		{
			accessorKey: "role",
			header: t("shared.role"),
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Typography variant="caption" className="text-gray-900">
						{t(`team.roles.${row.original.role.toLowerCase()}`)}
					</Typography>
					{isOwner && (
						<ChangeRoleModal
							memberId={row.original.id}
							currentRole={row.original.role}
						/>
					)}
				</div>
			),
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border w-full max-w-[40rem]">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								{t("shared.noResults")}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

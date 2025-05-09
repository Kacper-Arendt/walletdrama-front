export interface Team {
	id: string;
	name: string;
	ownerId: string;
	members: TeamMember[];
}

export interface TeamMember {
	id: string;
	email: string;
	role: MemberRole;
}

export type MemberRole = "Owner" | "Admin" | "Member" | "Viewer";

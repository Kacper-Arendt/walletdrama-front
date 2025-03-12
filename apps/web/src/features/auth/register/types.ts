import type { ActionFormType } from "types/ActionFormType";

export interface ActionResponse extends ActionFormType<RegisterUserPayload> {}

export interface RegisterUserPayload {
	email: string;
	password: string;
}

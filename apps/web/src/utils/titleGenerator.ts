import { appConfig } from "@/config/app";

export const titleGenerator = ({ title }: { title: string }) => {
	if (!title) appConfig.name;

	return `${title} | ${appConfig.name}`;
};

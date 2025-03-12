import { RegisterForm } from "features/auth/register/components/RegisterForm";
import { cookies } from "next/headers";

export default async function Register() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	console.log("token", token);

	return <RegisterForm />;
}

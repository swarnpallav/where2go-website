import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("invalid email address"),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" })
		.max(15, "Password can not have more than 15 characters"),
});

export default loginSchema;

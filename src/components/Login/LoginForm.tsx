"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginSchema from "@/schemas/loginSchema";
import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useUserApi } from "@/providers/UserStoreProvider";

interface LoginFormProps {
	onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
	const [loading, setLoading] = useState(false);
	const { login } = useUserApi();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		setLoading(true);
		const [error] = await login(data);
		setLoading(false);

		if (error) {
			const errorMessage = error?.message ?? "Something went wrong. Please try again";

			toast({
				title: "Login failed!",
				description: errorMessage,
				variant: "destructive",
			});
			return;
		}

		onLoginSuccess?.();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="enter email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="enter password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					{loading ? <Loader2 /> : "Sign In"}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;

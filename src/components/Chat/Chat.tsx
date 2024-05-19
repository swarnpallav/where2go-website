"use client";

import { ScrollArea } from "../ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SendHorizonalIcon } from "lucide-react";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "message must be at least 2 characters.",
	}),
});

const InputForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
		},
	});

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="m-0" type="submit">
					<SendHorizonalIcon />
				</Button>
			</form>
		</Form>
	);
};

const Chat = () => {
	return (
		<div className="rounded-md border">
			<ScrollArea className="h-[600px] w-[350px] rounded-md p-4">
				Jokester began sneaking into the castle in the middle of the night and leaving jokes all
				over the place: under the pillow, in his soup, even in the royal toilet. The king was
				furious, but he could not seem to stop Jokester. And then, one day, the people of the
				kingdom discovered that the jokes left by Jokester were so funny that they could not help
				but laugh. And once they started laughing, they could not stop.
			</ScrollArea>
			<InputForm />
		</div>
	);
};

export default Chat;

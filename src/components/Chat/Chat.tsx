"use client";

import { ScrollArea } from "../ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { SendHorizonalIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import Message from "./Message";

const FormSchema = z.object({
	message: z.string().min(2, {
		message: "message must be at least 2 characters.",
	}),
});

const InputForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: "",
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex p-3 gap-3 items-end bg-primary-foreground"
			>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem className="flex-1 flex grow">
							<FormControl>
								<Textarea
									placeholder="Add a message"
									className="resize-none rounded-full min-h-[40px] max-h-[100px] grow"
									{...field}
									rows={1}
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="m-0 rounded-full w-[40px] h-[40px] p-0" type="submit">
					<SendHorizonalIcon size={18} />
				</Button>
			</form>
		</Form>
	);
};

const Chat = () => {
	const messages = [
		"Heelo",
		"Hi",
		"bye bye",
		"ok bye",
		"Heelo",
		"Hi",
		"bye bye",
		"ok bye",
		"Heelo",
		"Hi",
		"bye bye",
		"ok bye",
		"Heelo",
		"Hi",
		"bye bye",
		"ok bye",
	];
	return (
		<div className="w-full md:w-[350px] rounded-lg overflow-hidden border max-h-[80vh] flex flex-col bg-primary-foreground">
			<div className="p-4 text-center font-medium bg-primary-foreground">Chat Globally</div>
			<Separator />
			<ScrollArea className="md:w-[350px] rounded-md flex-1">
				{messages.map((_, i) => (
					<Message key={i} />
				))}
			</ScrollArea>
			<Separator />
			<InputForm />
		</div>
	);
};

export default Chat;

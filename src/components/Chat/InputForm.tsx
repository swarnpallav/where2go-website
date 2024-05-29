"use client";

import { toast } from "@/components/ui/use-toast";
import { SendHorizonalIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { useSWRConfig } from "swr";
import { postRequest } from "@/utils/apiRequest";
import React, { useEffect } from "react";

const FormSchema = z.object({
	message: z.string().min(2, {
		message: "message must be at least 2 characters.",
	}),
});

interface InputFormProps {
	onMessageSent: (message: string) => void;
	replyingTo?: {
		_id: string;
		username: string;
	};
}

const InputForm: React.FC<InputFormProps> = ({ onMessageSent, replyingTo }) => {
	const { mutate } = useSWRConfig();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			message: "",
		},
	});

	useEffect(() => {
		if (form) {
			if (replyingTo?.username) {
				form.setValue("message", `@${replyingTo.username} `);
			} else {
				form.setValue("message", "");
			}
		}
	}, [form, replyingTo?.username]);

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const { message } = data;
		onMessageSent(message);
		form.reset();
		const [error, response] = await postRequest("/message/add", {
			id: replyingTo?._id ?? "",
			body: {
				text: message,
			},
		});

		if (error) {
			toast({
				title: "Failed to send message",
				description: error?.message || "Something went wrong while sending message",
			});
		}

		if (response?.success) {
			mutate("/message/get-latest-messages");
		}
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
						<FormItem className="flex-1 flex grow flex-col-reverse gap-4">
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

export default InputForm;

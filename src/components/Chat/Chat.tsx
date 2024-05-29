"use client";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Message from "./Message";
import useSWR from "swr";
import { getRequest } from "@/utils/apiRequest";
import { IMessage } from "./Message.interface";
import { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import { useUserStore } from "@/providers/UserStoreProvider";
import ReplyingTo from "./ReplyingTo";

const Chat = () => {
	const user = useUserStore(state => ({
		_id: state._id,
		username: state.username,
		avatar: state.avatar,
	}));
	const [replyingTo, setReplyingTo] = useState<{
		_id: string;
		username: string;
		parentMsgId: string;
	}>({
		_id: "",
		username: "",
		parentMsgId: "",
	});

	const [pendingMessages, setPendingMessages] = useState<IMessage[]>([]);

	const scrollRef = useRef<HTMLDivElement>(null);
	const {
		data,
	}: {
		data?: {
			data: IMessage[];
		};
	} = useSWR("/message/get-latest-messages", async (url: string) => {
		const [, response] = await getRequest(url);

		setPendingMessages([]);

		return response;
	});

	const messages: (IMessage & { showReplies?: boolean })[] | undefined = data?.data;

	useEffect(() => {
		scrollRef.current?.scrollIntoView();
	}, [messages, pendingMessages]);

	const onMessageSent = (message: string) => {
		if (replyingTo._id) {
			setReplyingTo({
				_id: "",
				username: "",
				parentMsgId: "",
			});
		} else {
			setPendingMessages([
				...pendingMessages,
				{
					body: { text: message },
					_id: "",
					owner: user,
					createdAt: new Date(),
					replies: [],
				},
			]);
		}
	};

	return (
		<div className="w-full flex md:w-[350px] rounded-lg overflow-hidden border h-[80vh]  flex-col bg-primary-foreground fixed md:relative left-0 bottom-0">
			<div className="p-4 text-center font-medium bg-primary-foreground">Chat Globally</div>
			<Separator />
			<ScrollArea className="md:w-[350px] rounded-md flex-1">
				{messages?.map((message, i) => (
					<Message
						setReplyingTo={setReplyingTo}
						key={i}
						{...message}
						showReplies={message.showReplies}
					/>
				))}
				{pendingMessages?.map((message, i) => (
					<Message key={`pending-${i}`} {...message} sending />
				))}
				<div id="scroll-helper" className="h-1 w-full" ref={scrollRef} />
			</ScrollArea>
			{replyingTo.username && (
				<>
					<Separator />
					<ReplyingTo
						replyingTo={replyingTo}
						onClose={() => setReplyingTo({ _id: "", username: "", parentMsgId: "" })}
					/>
				</>
			)}
			<Separator />
			<InputForm replyingTo={replyingTo} onMessageSent={onMessageSent} />
		</div>
	);
};

export default Chat;

import { memo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IMessage } from "./Message.interface";
import { formatRelative, subDays } from "date-fns";
import { useUserStore } from "@/providers/UserStoreProvider";

interface MessageProps extends IMessage {
	setReplyingTo?: ({
		_id,
		username,
		parentMsgId,
	}: {
		_id: string;
		username: string;
		parentMsgId: string;
	}) => void;
	sending?: boolean;
	showReplies?: boolean;
}

const Message: React.FC<MessageProps> = ({
	body,
	_id,
	owner,
	replies,
	createdAt,
	setReplyingTo,
	sending,
	parent,
	showReplies: showRepliesInit = false,
}) => {
	const [showReplies, setShowReplies] = useState(showRepliesInit);
	const userId = useUserStore(state => state._id);
	return (
		<>
			<div className={`flex gap-1 p-2 ${owner._id === userId ? "" : ""}`}>
				<div className={`${owner._id === userId ? "" : ""}`}>
					<div className="relative">
						<div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-6 md:w-6">
							<Avatar>
								<AvatarImage className="md:h-6 md:w-6" src="https://github.com/shadcn.png" />
								<AvatarFallback>Avatar</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</div>
				<div className={`flex flex-col gap-1 ${owner._id === userId ? "" : ""}`}>
					<div className="flex items-center gap-1">
						<div className="text-sm text-gray-500">{owner.username}</div>
						<div className="text-xs text-gray-400">
							{formatRelative(subDays(new Date(createdAt), 0), new Date())}
						</div>
					</div>
					<div className="text-xs w-fit overflow-hidden bg-gray-200 rounded-full py-1 px-2 md:py-2 md:px-3">
						<div className="dark:text-background max-w-[200px]">{body.text}</div>
					</div>
					{!sending && (
						<div className="flex items-center gap-1">
							<div
								onClick={() =>
									setReplyingTo?.({ _id, username: owner.username, parentMsgId: parent ?? _id })
								}
								className="text-sm text-gray-500 ml-3 cursor-pointer hover:underline"
							>
								reply
							</div>
						</div>
					)}
					{!!replies?.length && (
						<div
							onClick={() => setShowReplies(prev => !prev)}
							className="text-sm ml-3 cursor-pointer flex items-center gap-2"
						>
							<span className="inline-block w-6 h-[1px] bg-white"></span>
							{showReplies ? "Hide replies" : `View replies (${replies?.length})`}
						</div>
					)}
				</div>
				{sending && (
					<div className="text-sm text-gray-500 ml-3 cursor-pointer hover:underline order-3 flex items-center">
						sending...
					</div>
				)}
			</div>
			{showReplies && (
				<div className="ml-4">
					{replies?.map((reply, i) => <Message setReplyingTo={setReplyingTo} {...reply} key={i} />)}
				</div>
			)}
		</>
	);
};

export default memo(Message);

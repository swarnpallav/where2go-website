import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Message = () => {
	return (
		<div className="flex gap-1 p-2">
			<div>
				<div className="relative">
					<div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>Avatar</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-1">
					<div className="text-sm text-gray-500">Test user</div>
					<div className="text-xs text-gray-400">12:38 AM</div>
				</div>
				<div className="text-sm w-fit overflow-hidden bg-gray-100 rounded-full py-2 px-3">
					<div className="dark:text-background">Hello brother</div>
				</div>
			</div>
		</div>
	);
};

export default Message;

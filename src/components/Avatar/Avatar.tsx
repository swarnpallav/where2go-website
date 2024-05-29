"use client";

import { useUserStore } from "@/providers/UserStoreProvider";
import { Avatar as AavatarWrapper, AvatarFallback, AvatarImage } from "../ui/avatar";

const Avatar = ({ className }: { className?: string }) => {
	const avatar = useUserStore(state => state.avatar);

	return (
		<AavatarWrapper className={className}>
			<AvatarImage src={avatar || "https://github.com/shadcn.png"} />
			<AvatarFallback>Avatar</AvatarFallback>
		</AavatarWrapper>
	);
};

export default Avatar;

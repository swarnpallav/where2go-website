import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import Avatar from "../Avatar";
import { useUserStore } from "@/providers/UserStoreProvider";
import Logout from "../Header/Logout";

interface ProfileModalProps {
	closeModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ closeModal }) => {
	const user = useUserStore(state => state);
	const isMobile = useIsMobile();

	const handleOnOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			closeModal();
		}
	};

	return (
		<Sheet open={true} onOpenChange={handleOnOpenChange}>
			<SheetContent className="flex flex-col" side={isMobile ? "bottom" : "right"}>
				<SheetHeader>
					<SheetTitle>Proile Menu</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col items-center w-full py-8 gap-2">
					<Avatar className="w-24 h-24" />
					<div className="flex gap-2 p-2">{user.username}</div>
					<div className="flex gap-2 p-2">{user.email}</div>
					<div className="flex p-4">
						<Logout />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default ProfileModal;

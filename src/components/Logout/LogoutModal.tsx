import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useUserApi } from "@/providers/UserStoreProvider";

interface LogoutModalProps {
	closeModal: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ closeModal }) => {
	const isMobile = useIsMobile();
	const { logout } = useUserApi();

	const handleOnOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			closeModal();
		}
	};

	const onLogoutConfirm = async () => {
		const [error] = await logout();

		if (error) {
			toast({
				title: "Something went wrong.",
				description: "Unable to logout. Please try after some time.",
				variant: "destructive",
			});
		} else {
			toast({
				title: "Logout Successful",
			});
		}
		closeModal();
	};
	return isMobile ? (
		<Sheet open={true} onOpenChange={handleOnOpenChange}>
			<SheetContent className="flex flex-col" side={"bottom"}>
				<SheetHeader>
					<SheetTitle>logout</SheetTitle>
					<SheetDescription>
						are you sure you would like to logout of your account?
					</SheetDescription>
				</SheetHeader>
				<SheetFooter className="flex flex-row gap-4">
					<Button className="w-full" onClick={closeModal} variant={"secondary"}>
						no
					</Button>
					<Button className="w-full" onClick={onLogoutConfirm}>
						yes
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	) : (
		<Dialog open={true} onOpenChange={handleOnOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>logout</DialogTitle>
					<DialogDescription>
						are you sure you would like to logout of your account?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button onClick={closeModal} variant={"secondary"}>
						no
					</Button>
					<Button onClick={onLogoutConfirm}>yes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutModal;

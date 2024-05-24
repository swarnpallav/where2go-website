import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import LoginForm from "./LoginForm";

interface LoginModalProps {
	closeModal: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
	const isMobile = useIsMobile();
	return isMobile ? (
		<Sheet open={true}>
			<SheetContent className="flex flex-col" side={"bottom"}>
				<SheetHeader>
					<SheetTitle>sign in with email and password</SheetTitle>
				</SheetHeader>
				<LoginForm onLoginSuccess={closeModal} />
			</SheetContent>
		</Sheet>
	) : (
		<Dialog open={true}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>Sign in with email and password</DialogDescription>
				</DialogHeader>
				<LoginForm onLoginSuccess={closeModal} />
			</DialogContent>
		</Dialog>
	);
};

export default LoginModal;

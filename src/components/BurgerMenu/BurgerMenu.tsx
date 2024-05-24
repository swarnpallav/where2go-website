import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import ModeToggle from "../ModeToggle";

const BurgerMenu = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<MenuIcon className="md:hidden m-2 mr-0" />
			</SheetTrigger>
			<SheetContent className="flex flex-col" side={"left"}>
				<ModeToggle />
				<Button>contact us</Button>
				<Button>log out</Button>
			</SheetContent>
		</Sheet>
	);
};

export default BurgerMenu;

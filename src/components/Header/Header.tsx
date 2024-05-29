import Image from "next/image";
import ModeToggle from "../ModeToggle";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { BellIcon } from "lucide-react";
import BurgerMenu from "../BurgerMenu";
import Login from "./Login";
import Link from "next/link";
import Profile from "./Profile";

const Header = () => {
	return (
		<header className="w-screen sticky top-0 left-0 bg-primary-foreground z-10">
			<div className="flex justify-between md:px-24 items-center">
				<div className="flex items-center">
					<BurgerMenu />
					<Link href={"/"}>
						<Image
							className="w-16 h-16 mix-blend-exclusion"
							src={"/images/WH.jpg"}
							alt="brand-logo"
							height={84}
							width={84}
						/>
					</Link>
				</div>
				<div className="flex items-center gap-3 p-2 md:p-0">
					<BellIcon className="cursor-pointer" />
					<Button className="hidden md:block">contact us</Button>
					<Login />
					<Profile />
					<div className="hidden md:block">
						<ModeToggle />
					</div>
				</div>
			</div>
			<Separator />
		</header>
	);
};

export default Header;

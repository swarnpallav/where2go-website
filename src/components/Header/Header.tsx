import Image from "next/image";
import ModeToggle from "../ModeToggle";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Header = () => {
	return (
		<header className="w-screen sticky top-0 left-0 bg-primary-foreground z-10">
			<div className="flex justify-between md:px-24 items-center">
				<Image
					className="w-16 h-16 mix-blend-exclusion"
					src={"/images/WH.jpg"}
					alt="brand-logo"
					height={84}
					width={84}
				/>
				<div className="flex items-center gap-3">
					<Button>notification</Button>
					<Button>contact us</Button>
					<Button>sign in</Button>
					<ModeToggle />
				</div>
			</div>
			<Separator />
		</header>
	);
};

export default Header;

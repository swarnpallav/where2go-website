import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface CustomTabsProps {
	onTabSelect: (selectedTab: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ onTabSelect }) => {
	return (
		<Tabs onValueChange={onTabSelect} defaultValue="explore" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="explore">Explore</TabsTrigger>
				<TabsTrigger value="chat">Chat</TabsTrigger>
			</TabsList>
		</Tabs>
	);
};

export default CustomTabs;

"use client";

import Chat from "@/components/Chat";
import CustomTabs from "@/components/Tabs/Tabs";
import React, { useState } from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	const [selectedTab, setSelectedTab] = useState("explore");

	return (
		<div>
			<div className="py-4 px-2 md:hidden">
				<CustomTabs onTabSelect={setSelectedTab} />
			</div>
			<div id="image-section" className={`md:px-24 md:py-12 flex w-full flex-wrap gap-10`}>
				<div
					className={`flex-1 max-h-[80vh] relative md:block overflow-y-scroll no-scrollbar ${selectedTab === "explore" ? "block" : "hidden"}`}
				>
					{children}
				</div>
				<div className={`${selectedTab === "chat" ? "block" : "hidden"} w-full md:w-auto md:block`}>
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default ChatLayout;

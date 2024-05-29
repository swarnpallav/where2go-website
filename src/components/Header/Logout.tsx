"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useUserStore } from "@/providers/UserStoreProvider";

const LogoutModal = dynamic(() => import("../Logout/LogoutModal"));

const Logout = () => {
	const [showModal, toggleModal] = useState(false);
	const isLoggedIn = useUserStore(state => state._id);

	return (
		<>
			<Button className={`${isLoggedIn ? "" : "hidden"}`} onClick={() => toggleModal(true)}>
				logout
			</Button>
			{showModal && <LogoutModal closeModal={() => toggleModal(false)} />}
		</>
	);
};

export default Logout;

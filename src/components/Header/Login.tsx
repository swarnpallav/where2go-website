"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useUserStore } from "@/providers/UserStoreProvider";

const LoginModal = dynamic(() => import("../Login/LoginModal"));

const Login = () => {
	const [showModal, toggleModal] = useState(false);
	const isLoggedIn = useUserStore(state => state._id);
	return (
		<>
			<Button className={`${isLoggedIn ? "hidden" : ""}`} onClick={() => toggleModal(true)}>
				sign in
			</Button>
			{showModal && <LoginModal closeModal={() => toggleModal(false)} />}
		</>
	);
};

export default Login;

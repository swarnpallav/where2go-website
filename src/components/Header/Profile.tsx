"use client";

import { UserCircle2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProfileModal = dynamic(() => import("@/components/Profile/ProfileModal"));

const Profile = () => {
	const [showModal, toggleModal] = useState(false);
	return (
		<>
			<UserCircle2Icon onClick={() => toggleModal(true)} className="w-7 h-7 cursor-pointer" />
			{showModal && <ProfileModal closeModal={() => toggleModal(false)} />}
		</>
	);
};

export default Profile;

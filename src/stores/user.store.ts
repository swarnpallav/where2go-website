import { getRequest, postRequest } from "@/utils/apiRequest";
import { createStore } from "zustand/vanilla";

export type UserState = {
	email: string;
	_id: string;
};

export type UserActions = {
	// login: (user: UserState) => void;
	// logout: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
	email: "",
	_id: "",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
	return createStore<UserStore>()(set => ({
		...initState,
	}));
};

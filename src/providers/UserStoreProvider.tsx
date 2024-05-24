"use client";

import { type ReactNode, createContext, useRef, useContext, useEffect, useMemo } from "react";
import { type StoreApi, useStore } from "zustand";

import { type UserStore, createUserStore, defaultInitState } from "@/stores/user.store";
import { getRequest, postRequest } from "@/utils/apiRequest";

interface UserActions {
	login: (user: { email: string; password: string }) => Promise<any[]>;
	logout: () => Promise<any[]>;
}

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

export const UserApiContext = createContext<UserActions | null>(null);

export interface UserStoreProviderProps {
	children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
	const storeRef = useRef<StoreApi<UserStore>>();
	if (!storeRef.current) {
		storeRef.current = createUserStore();
	}

	const logout = async () => {
		const [error, response] = await postRequest("/user/logout");

		if (response?.success) {
			storeRef.current?.setState(defaultInitState);
		}

		return [error, response];
	};

	const login = async (data: { email: string; password: string }) => {
		const [error, response] = await postRequest("/user/login", {
			email: data.email,
			password: data.password,
		});

		if (response?.success) {
			console.log("~ response", response.data.user._id, response.data.user.email);
			storeRef.current?.setState({ _id: response.data.user._id, email: response.data.user.email });
		}

		return [error, response];
	};

	const fetchUserData = async () => {
		const [, response] = await getRequest("/user/user-info");

		if (response?.success) {
			storeRef.current?.setState(response.data);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const apiCtxValue = useMemo(() => {
		return {
			login,
			logout,
		};
	}, []);

	return (
		<UserApiContext.Provider value={apiCtxValue}>
			<UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
		</UserApiContext.Provider>
	);
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
	const userStoreContext = useContext(UserStoreContext);

	if (!userStoreContext) {
		throw new Error(`useUserStore must be use within UserStoreProvider`);
	}

	return useStore(userStoreContext, selector);
};

export const useUserApi = () => {
	const userApiContext = useContext(UserApiContext);

	if (!userApiContext) {
		throw new Error(`useUserApi must be use within UserStoreProvider`);
	}

	return userApiContext;
};

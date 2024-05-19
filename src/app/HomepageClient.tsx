"use client";

import Combobox from "@/components/Combobox";
import { getRequest } from "@/utils/fetchRequest";
import useSWR from "swr";
import React, { useCallback, useState } from "react";
import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";

interface HomepageClientProps {
	states: {
		name: string;
		_id: string;
	}[];
}

const HomepageClient: React.FC<HomepageClientProps> = ({ states }) => {
	const [stateId, setStateId] = useState("");

	const fetchCities = useCallback(async () => {
		let response = [];
		if (stateId) {
			response = await getRequest(`/city/getCitiesByStateId/${stateId}`);
		}
		return response;
	}, [stateId]);

	const {
		data,
	}: { data?: { data: { name: string; _id: string }[] }; error: any; isLoading: boolean } = useSWR(
		`/city/getCitiesByStateId/${stateId}`,
		fetchCities
	);

	const cities = data?.data ?? [];

	const bgImage = " bg-[url('/images/bg4.jpg')] bg-no-repeat bg-blend-soft-light";

	return (
		<div>
			<div id="image-section" className={`px-24 flex w-full flex-wrap`}>
				<div className="flex flex-1 p-24 flex-col items-center justify-center">
					<div className="flex gap-24">
						<Combobox
							options={states.map(state => ({
								label: state.name,
								value: state.name,
								identifier: state._id,
							}))}
							optionsOf={"states"}
							onSelect={id => setStateId(id)}
						/>
						<Combobox
							options={cities.map(city => ({
								label: city.name,
								value: city.name,
								identifier: city._id,
							}))}
							optionsOf={"cities"}
							// onSelect={id => setStateId(id)}
						/>
					</div>
					<Button className="mt-24" size={"default"}>
						Search Destination
					</Button>
				</div>
				<Chat />
			</div>
		</div>
	);
};

export default HomepageClient;

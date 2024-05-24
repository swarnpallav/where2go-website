"use client";

import Combobox from "@/components/Combobox";
import { getRequest } from "@/utils/apiRequest";
import useSWR from "swr";
import React, { useCallback, useState } from "react";
import Chat from "@/components/Chat";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type CityResponse = {};

interface HomepageClientProps {
	states: {
		name: string;
		_id: string;
	}[];
}

const HomepageClient: React.FC<HomepageClientProps> = ({ states }) => {
	const [stateId, setStateId] = useState("");

	const fetchCities = useCallback(async () => {
		if (stateId) {
			const [, response] = await getRequest(`/city/getCitiesByStateId/${stateId}`);
			return response;
		}
	}, [stateId]);

	const {
		data,
	}: { data?: { data: { name: string; _id: string }[] }; error: any; isLoading: boolean } = useSWR(
		`/city/getCitiesByStateId/${stateId}`,
		fetchCities
	);

	const cities = data?.data ?? [];

	return (
		<div>
			<div id="image-section" className={`md:px-24 md:py-12 flex w-full flex-wrap gap-10`}>
				<div className="flex flex-1 max-h-[80vh] relative">
					<div
						className={`flex py-12 md:py-0 gap-12 md:gap-0 flex-1 flex-col items-center justify-around max-h-[80vh]`}
					>
						<div className="text-center text-lg md:text-6xl">
							Find your favourite destination in our loving country
						</div>
						<div className="flex flex-col md:flex-row md:gap-24 gap-12">
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
						<Button size={"default"}>Search Destination</Button>
					</div>
					<Image
						src={"/images/india.jpg"}
						alt="bg=image"
						fill
						className="dark:invert dark:mix-blend-screen opacity-[0.2] z-[-1] object-cover"
					/>
				</div>
				<Chat />
			</div>
		</div>
	);
};

export default HomepageClient;

// difference, exclusion, lighten, plus-lighter, color-dodge

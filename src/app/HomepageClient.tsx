"use client";

import Combobox from "@/components/Combobox";
import { getRequest } from "@/utils/apiRequest";
import useSWR from "swr";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type CityResponse = {};

interface HomepageClientProps {
	states: {
		name: string;
		_id: string;
	}[];
}

const HomepageClient: React.FC<HomepageClientProps> = ({ states }) => {
	const router = useRouter();
	const [stateId, setStateId] = useState("");
	const [cityId, setCityId] = useState("");

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

	const onSearchDestinationClick = () => {
		if (!cityId) {
			toast({
				title: "Please select State and City",
				variant: "destructive",
			});
		} else {
			router.push("/" + cityId);
		}
	};

	return (
		<div>
			<div className="flex h-[80vh]">
				<div
					className={`flex py-24 px-4 md:px-0 md:py-0 gap-12 md:gap-0 flex-1 flex-col items-center justify-around max-h-[80vh]`}
				>
					<div className="text-center text-2xl md:text-6xl">
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
							onSelect={id => setCityId(id)}
						/>
					</div>
					<Button onClick={onSearchDestinationClick} size={"default"}>
						Search Destination
					</Button>
				</div>
				<Image
					src={"/images/india.jpg"}
					alt="bg=image"
					fill
					className="dark:invert dark:mix-blend-screen opacity-[0.2] z-[-1] object-cover"
				/>
			</div>
		</div>
	);
};

export default HomepageClient;

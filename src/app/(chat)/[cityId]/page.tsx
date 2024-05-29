import ImageCarousel from "@/components/ImageCarousel";
import { ICity } from "@/interfaces/city.interface";
import { IDestination } from "@/interfaces/destination.interface";
import { getRequest } from "@/utils/apiRequest";

const DestinationCatalogPage = async ({ params: { cityId } }: { params: { cityId: string } }) => {
	const [[destinationError, destinationResponse], [cityError, cityResponse]] = await Promise.all([
		getRequest("/destination/getDestinationsByCityId/" + cityId),
		getRequest("/city/" + cityId),
	]);

	if (destinationError || cityError) {
		throw new Error(destinationError?.message || cityError?.message);
	}

	const destinations: IDestination[] = destinationResponse.data;

	const city: ICity = cityResponse.data;

	return (
		<div className="p-2 md:p-6">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Places to visit in {city.name}
			</h1>
			<div className="pt-12 flex flex-col gap-10">
				{destinations.map((destination, index) => (
					<div key={destination._id} className="border rounded-lg p-4 bg-primary-foreground">
						<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
							{index + 1}. {destination.name}
						</h2>
						<div className="flex flex-col gap-4 mt-4">
							<div>
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Description:</h4>
								<p className="leading-7 [&:not(:first-child)]:mt-2">{destination.description}</p>
							</div>
						</div>
						{!!destination.images.length && <div className="flex flex-col gap-4 mt-6 md:mt-12">
							<ImageCarousel images={destination.images} />
						</div>}
						<div className="flex flex-col gap-4 mt-4">
							<div>
								<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Key features:</h4>
								<p className="leading-7 [&:not(:first-child)]:mt-2">{destination.directions}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DestinationCatalogPage;

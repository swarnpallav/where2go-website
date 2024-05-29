"use client";

import * as React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ImageCarouselProps {
	images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
	images = [...images, ...images];
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<Carousel setApi={setApi} className="w-full h-full">
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index} className="md:basis-1/4 relative aspect-square">
						<div className="h-full relative">
							<Image src={image} fill alt="image" className="object-cover rounded-lg" />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="top-[-24px] right-10 left-[unset] hidden md:flex" />
			<CarouselNext className="top-[-24px] right-0 hidden md:flex" />
		</Carousel>
	);
};

export default ImageCarousel;

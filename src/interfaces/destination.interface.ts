export interface IDestination {
	location: any;
	_id: string;
	name: string;
	description: string;
	images: string[];
	directions: string;
	createdAt: Date;
	updatedAt: Date;
	city: string;
	reviews: any[];
	likes: number;
    openingTime?: Date;
    closingTime?: Date;
}

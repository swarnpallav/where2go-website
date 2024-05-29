export interface ICity {
	_id: string;
	name: string;
	pincode: number;
	destinations: string[];
	createdAt: Date;
	updatedAt: Date;
	state: string;
}

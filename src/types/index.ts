export enum ProductType {
	FOOD,
	CLOTHING,
	DRINK
}

export type Festival = {
	id: any;
	name: string;
	stores: {
		name: string;
		stock: {
			name: string;
			type: ProductType;
			price: number;
		}[];
	}[];
};

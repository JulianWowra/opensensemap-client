import { RFC3339Date } from '../globalTypes';

export interface CalculatedIdw {
	code: 'Ok';
	data: {
		breaks: number[];
		featureCollection: {
			type: string;
			features: {
				type: string;
				properties: {
					idwValues: number[];
				};
				geometry: {
					type: string;
					coordinates: number[][][];
				};
			};
		}[];
		timesteps: RFC3339Date[];
	};
}

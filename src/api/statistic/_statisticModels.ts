import { enums, type Infer } from 'superstruct';

export const OPERATION = enums([
	'arithmeticMean',
	'geometricMean',
	'harmonicMean',
	'max',
	'median',
	'min',
	'mode',
	'rootMeanSquare',
	'standardDeviation',
	'sum',
	'variance'
]);

export type Operation = Infer<typeof OPERATION>;

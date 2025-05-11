import { type Infer, intersection, literal, object, optional, string } from 'superstruct';
import { SENSOR } from '../box/_boxModels';
import { COORDINATES, DATE_RFC3339, OPENSENSEMAP_ID } from '../globalTypes';

//
// https://docs.opensensemap.org/#api-Measurements
//

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L155C4-L155C4
 */
export const LAST_MEASUREMENT = object({
	value: string(),
	createdAt: DATE_RFC3339
});

export type LastMeasurement = Infer<typeof LAST_MEASUREMENT>;

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L8
 */
export const MEASUREMENT = object({
	_id: OPENSENSEMAP_ID,
	value: string(),
	sensor_id: OPENSENSEMAP_ID,
	createdAt: DATE_RFC3339,
	location: object({
		type: literal('Point'),
		coordinates: COORDINATES
	})
});

export type Measurement = Infer<typeof MEASUREMENT>;

/**
 * @linkcode
 */
export const LATEST_MEASUREMENT_SENSOR = intersection([
	SENSOR,
	object({
		lastMeasurement: optional(LAST_MEASUREMENT)
	})
]);

export type GetLatestMeasurement = Infer<typeof LATEST_MEASUREMENT_SENSOR>;

import { type Infer, number, object, optional, pattern, string, tuple, union } from 'superstruct';

/**
 * @see https://docs.opensensemap.org/#api-_
 */
export const OPENSENSEMAP_ID = pattern(string(), /^[a-f0-9]{24}$/);
export type OpenSenseMapID = Infer<typeof OPENSENSEMAP_ID>;

/**
 * @see https://docs.opensensemap.org/#api-_
 */
export const DATE_RFC3339 = pattern(string(), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/);
export type DateRFC3339 = Infer<typeof DATE_RFC3339>;

/**
 * 4 WGS84 coordinates separated by commas. You can use a tool like {@link http://bboxfinder.com|bboxfinder.com} to mark the box
 * @example "7.645503,51.962280,7.646168,51.962515"
 */
export const COORDINATES_WGS84 = pattern(string(), /^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/);
export type CoordinatesWGS84 = Infer<typeof COORDINATES_WGS84>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L31C2-L31C2|OpenSenseMap API code reference on GitHub}
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L23|OpenSenseMap API code reference on GitHub}
 */
export const COORDINATES = union([
	object({
		lat: number(),
		lng: number(),
		height: optional(number())
	}),
	tuple([number(), number(), optional(number())])
]);

export type Coordinates = Infer<typeof COORDINATES>;

/**
 * @see https://docs.opensensemap.org/#api-_
 */
export type RFC3339Date = string;

/**
 * @see https://docs.opensensemap.org/#api-_
 */
export type OpenSenseMapID = string;

/**
 * 4 WGS84 coordinates separated by commas. You can use a tool like {@link http://bboxfinder.com} to mark the box
 * @example "7.645503,51.962280,7.646168,51.962515"
 */
export type WGS84Coordinates = string;

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L31C2-L31C2
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/measurement/measurement.js#L23
 */
export type Coordinates =
	| {
			lat: number;
			lng: number;
			height?: number;
	  }
	| [number, number, number?];

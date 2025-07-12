import {
	array,
	boolean,
	deprecated,
	enums,
	type Infer,
	intersection,
	literal,
	min,
	number,
	object,
	optional,
	string,
	union,
	unknown
} from 'superstruct';
import { COORDINATES, DATE_RFC3339, OPENSENSEMAP_ID } from '../globalTypes';

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L65|OpenSenseMap API code reference on GitHub}
 */
export const EXPOSURE_TYPE = enums(['indoor', 'outdoor', 'mobile', 'unknown']);
export type ExposureType = Infer<typeof EXPOSURE_TYPE>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L212|OpenSenseMap API code reference on GitHub}
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L232C29-L232C37|OpenSenseMap API code reference on GitHub}
 */
export const COLUMNS = enums(['boxId', 'boxName', 'exposure', 'height', 'lat', 'lon', 'phenomenon', 'sensorType', 'unit']);
export type Columns = Infer<typeof COLUMNS>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L57|OpenSenseMap API code reference on GitHub}
 */
export const BOX_LOCATION = object({
	type: literal('Point'),
	coordinates: COORDINATES,
	timestamp: DATE_RFC3339
});

export type BoxLocation = Infer<typeof BOX_LOCATION>;

/**
 * @deprecated Use `currentLocation`
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L170C56-L170C63|OpenSenseMap API code reference on GitHub}
 */
export const BOX_LOC = deprecated(
	object({
		geometry: BOX_LOCATION,
		type: literal('Feature')
	}),
	(_value, ctx) => {
		console.warn(`${ctx.path.join('.')} is deprecated. Please use 'BoxLocation' instead.`);
	}
);

export type BoxLoc = Infer<typeof BOX_LOC>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/models/src/box/integrations.js#L8|OpenSenseMap API code reference on GitHub}
 */
export const MQTT = object({
	enabled: boolean(),
	url: string(),
	topic: string(),
	messageFormat: enums(['json', 'csv']),
	decodeOptions: string(),
	connectionOptions: string()
});

export type MQTT = Infer<typeof MQTT>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/models/src/box/integrations.js#L23|OpenSenseMap API code reference on GitHub}
 */
export const TTN = object({
	dev_id: string(),
	app_id: string(),
	profile: enums(['lora-serialization', 'sensebox/home', 'json', 'debug', 'cayenne-lpp']),
	decodeOptions: optional(array(unknown())),
	port: min(number(), 0, { exclusive: true })
});

export type TTN = Infer<typeof TTN>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/953c476b192bcb051823e67c2a3b3e9891eb7bea/packages/models/src/box/sensorLayouts/index.js#L34|OpenSenseMap API code reference on GitHub}
 */
export const BOX_MODEL = enums([
	'homeV2Lora',
	'homeV2Ethernet',
	'homeV2EthernetFeinstaub',
	'homeV2Wifi',
	'homeV2WifiFeinstaub',
	'homeEthernet',
	'homeWifi',
	'homeEthernetFeinstaub',
	'homeWifiFeinstaub',
	'luftdaten_sds011',
	'luftdaten_sds011_dht11',
	'luftdaten_sds011_dht22',
	'luftdaten_sds011_bmp180',
	'luftdaten_sds011_bme280',
	'luftdaten_pms1003',
	'luftdaten_pms1003_bme280',
	'luftdaten_pms3003',
	'luftdaten_pms3003_bme280',
	'luftdaten_pms5003',
	'luftdaten_pms5003_bme280',
	'luftdaten_pms7003',
	'luftdaten_pms7003_bme280',
	'luftdaten_sps30_bme280',
	'luftdaten_sps30_sht3x',
	'hackair_home_v2'
]);

export type BoxModel = Infer<typeof BOX_MODEL>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/953c476b192bcb051823e67c2a3b3e9891eb7bea/packages/models/src/box/sensorLayouts/index.js#L66|OpenSenseMap API code reference on GitHub}
 * @see {@link https://github.com/sensebox/openSenseMap-API/tree/953c476b192bcb051823e67c2a3b3e9891eb7bea/packages/models/src/box/sensorLayouts/sensorDefinitions|OpenSenseMap API code reference on GitHub}
 */
export const SENSOR_TEMPLATES = enums([
	'BME280',
	'BME680',
	'BMP180',
	'BMP280',
	'DHT11',
	'DHT22',
	'DNMS',
	'DPS310',
	'HDC1008',
	'PMS 1003',
	'PMS 3003',
	'PMS 5003',
	'PMS 7003',
	'SCD30',
	'SDS 011',
	'SHT3X',
	'SMT50',
	'SOUNDLEVELMETER',
	'SPS30',
	'TSL45315',
	'VEML6070',
	'WINDSPEED'
]);

export type SensorTemplates = Infer<typeof SENSOR_TEMPLATES>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/sensor/sensor.js#L8|OpenSenseMap API code reference on GitHub}
 */
export const SENSOR = object({
	_id: OPENSENSEMAP_ID,
	title: string(),
	unit: string(),
	sensorType: optional(string()),
	icon: optional(string())
});

export type Sensor = Infer<typeof SENSOR>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L47|OpenSenseMap API code reference on GitHub}
 */
export const BOX_DATA = object({
	_id: OPENSENSEMAP_ID,
	name: string(),
	createdAt: DATE_RFC3339,
	exposure: EXPOSURE_TYPE,
	model: string(),
	descriptiom: optional(string()),
	grouptag: optional(array(EXPOSURE_TYPE)),
	weblink: optional(string()),
	image: optional(string()),
	currentLocation: BOX_LOCATION,
	loc: array(BOX_LOC),
	updatedAt: DATE_RFC3339,
	sensor: array(),
	lastMeasurementAt: optional(DATE_RFC3339)
});

export type BoxData = Infer<typeof BOX_DATA>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L172|OpenSenseMap API code reference on GitHub}
 */
export const BOX_DATA_WITH_SECRETS = intersection([
	BOX_DATA,
	object({
		integrations: object({
			mqtt: union([object({ enabled: literal(false) }), MQTT]),
			ttn: optional(TTN)
		}),
		access_token: string(),
		useAuth: optional(boolean())
	})
]);

export type BoxDataWithSecrets = Infer<typeof BOX_DATA_WITH_SECRETS>;

/**
 * @see {@link https://github.com/sensebox/openSenseMap-API/blob/953c476b192bcb051823e67c2a3b3e9891eb7bea/packages/models/src/box/claim.js#L17|OpenSenseMap API code reference on GitHub}
 */
export const BOX_TRANSFER_INFORMATION = object({
	_id: OPENSENSEMAP_ID,
	boxId: OPENSENSEMAP_ID,
	token: string(),
	createdAt: DATE_RFC3339,
	updatedAt: DATE_RFC3339,
	expiresAt: DATE_RFC3339
});

export type BoxTransferInformation = Infer<typeof BOX_TRANSFER_INFORMATION>;

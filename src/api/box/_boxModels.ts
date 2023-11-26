import { Coordinates, OpenSenseMapID, RFC3339Date } from '../globalTypes';
import { LastMeasurement, Measurement } from '../measurement/_measurementModels';

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L47
 */
export type BoxData = {
	_id: OpenSenseMapID;
	name: string;
	createdAt: RFC3339Date;
	exposure: Exposure;
	model: string;
	description?: string;
	grouptag?: string[];
	weblink?: string;
	image?: string;
	currentLocation: BoxLocation;
	loc: BoxLoc[];
	updatedAt: RFC3339Date;
	sensors: Sensor<Measurement | LastMeasurement | Measurement['_id'] | null>[];
	lastMeasurementAt?: RFC3339Date;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L172
 */
export type BoxDataWithSecrets = BoxData & {
	integrations: {
		mqtt:
			| {
					enabled: false;
			  }
			| MQTT;
		ttn?: TTN;
	};
	access_token: string;
	useAuth?: boolean;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L65
 */
export type Exposure = 'indoor' | 'outdoor' | 'mobile' | 'unknown';

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/measurementsController.js#L212
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/api/lib/controllers/statisticsController.js#L232C29-L232C37
 */
export type Columns = 'boxId' | 'boxName' | 'exposure' | 'height' | 'lat' | 'lon' | 'phenomenon' | 'sensorType' | 'unit';

/**
 * @deprecated Use `currentLocation`
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L170C56-L170C63
 */
export type BoxLoc = {
	geometry: BoxLocation;
	type: 'Feature';
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L57
 */
export type BoxLocation = {
	type: 'Point';
	coordinates: Coordinates;
	timestamp: RFC3339Date;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/models/src/box/integrations.js#L8
 */
export type MQTT = {
	enabled: boolean;
	url: string;
	topic: string;
	messageFormat: 'json' | 'csv';
	decodeOptions: string;
	connectionOptions: string;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/861dd9b2e9498b380b52839da84aa9ab27f1fc42/packages/models/src/box/integrations.js#L23
 */
export type TTN = {
	dev_id: string;
	app_id: string;
	profile: 'lora-serialization' | 'sensebox/home' | 'json' | 'debug' | 'cayenne-lpp';
	decodeOptions?: unknown[];
	port: number;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/sensor/sensor.js#L8
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L1057
 */
export type Sensor<T extends Measurement | LastMeasurement | Measurement['_id'] | null | undefined> = {
	_id: OpenSenseMapID;
	title: string;
	unit: string;
	sensorType?: string;
	icon?: string;
	lastMeasurement?: T;
};

/**
 * @linkcode https://github.com/sensebox/openSenseMap-API/blob/2e645bdc4c80e668720b5eaaf384a35d2909569e/packages/models/src/box/box.js#L77C5-L77C5
 */
export type BoxModel =
	| 'homeV2Lora'
	| 'homeV2Ethernet'
	| 'homeV2Wifi'
	| 'homeEthernet'
	| 'homeWifi'
	| 'homeEthernetFeinstaub'
	| 'homeWifiFeinstaub'
	| 'luftdaten_sds011'
	| 'luftdaten_sds011_dht11'
	| 'luftdaten_sds011_dht22'
	| 'luftdaten_sds011_bmp180'
	| 'luftdaten_sds011_bme280'
	| 'hackair_home_v2';

export type BoxTransferInformation = {
	_id: OpenSenseMapID;
	boxId: OpenSenseMapID;
	token: string;
	createdAt: RFC3339Date;
	updatedAt: RFC3339Date;
	expiresAt: RFC3339Date;
};

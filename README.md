# openSenseMap Client

Based on API version: `v11.3.0`

[![NPM](https://nodei.co/npm/opensensemap-client.png)](https://npmjs.org/package/opensensemap-client)

## Install

```bash
npm install opensensemap-client
```

```bash
pnpm install opensensemap-client
```

```bash
yarn add opensensemap-client
```

## Usage

Usage in TypeScript (with ES Modules):

```typescript
import * as client from 'opensensemap-client';

async function start() {
  // Get information about a senseBox
  const r = await client.getBox('57000b8745fd40c8196ad04c').catch((e) => console.error(e));

  console.log(JSON.stringify(r));

  // Post new sensor data
  const data: client.PostNewMeasurementsParamData = [];
  const authToken = 'Your senseBox token';

  data.push({
    sensor: 'Your sensorId',
    value: 'Your data'
  });

  client.postNewMeasurements('Your senseBoxId', data, authToken).catch(console.error);
}

start();
```

---

## Listed functions according to API documentation of openSenseMap

## API Functions Reference

### Boxes

| Function                                                                                                | Description                          | OpenSenseMap API Documentation                                      |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| [`getBox()`](https://julianwowra.github.io/opensensemap-client/functions/getBox.html)                   | Get one senseBox                     | [API Doc](https://docs.opensensemap.org/#api-Boxes-getBox)          |
| [`getBoxes()`](https://julianwowra.github.io/opensensemap-client/functions/getBoxes.html)               | Get all senseBoxes                   | [API Doc](https://docs.opensensemap.org/#api-Boxes-getBoxes)        |
| [`postNewBox()`](https://julianwowra.github.io/opensensemap-client/functions/postNewBox.html)           | Post new senseBox                    | [API Doc](https://docs.opensensemap.org/#api-Boxes-postNewBox)      |
| [`updateBox()`](https://julianwowra.github.io/opensensemap-client/functions/updateBox.html)             | Update a senseBox                    | [API Doc](https://docs.opensensemap.org/#api-Boxes-updateBox)       |
| [`deleteBox()`](https://julianwowra.github.io/opensensemap-client/functions/deleteBox.html)             | Mark a senseBox for deletion         | [API Doc](https://docs.opensensemap.org/#api-Boxes-deleteBox)       |
| [`getAllTags()`](https://julianwowra.github.io/opensensemap-client/functions/getAllTags.html)           | Get all senseBox tags                | [API Doc](https://docs.opensensemap.org/#api-Boxes-getAllTags)      |
| [`claimBox()`](https://julianwowra.github.io/opensensemap-client/functions/claimBox.html)               | Claim a senseBox marked for transfer | [API Doc](https://docs.opensensemap.org/#api-Boxes-claimBox)        |
| [`getSketch()`](https://julianwowra.github.io/opensensemap-client/functions/getSketch.html)             | Download the Arduino script          | [API Doc](https://docs.opensensemap.org/#api-Boxes-getSketch)       |
| [`getBoxLocations()`](https://julianwowra.github.io/opensensemap-client/functions/getBoxLocations.html) | Get locations of a senseBox          | [API Doc](https://docs.opensensemap.org/#api-Boxes-getBoxLocations) |
| [`getTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/getTransfer.html)         | Get transfer information             | [API Doc](https://docs.opensensemap.org/#api-Boxes-getTransfer)     |
| [`createTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/createTransfer.html)   | Mark a senseBox for transfer         | [API Doc](https://docs.opensensemap.org/#api-Boxes-createTransfer)  |
| [`removeTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/removeTransfer.html)   | Revoke transfer token                | [API Doc](https://docs.opensensemap.org/#api-Boxes-removeTransfer)  |
| [`updateTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/updateTransfer.html)   | Update a transfer token              | [API Doc](https://docs.opensensemap.org/#api-Boxes-updateTransfer)  |

### Measurements

| Function                                                                                                                          | Description                           | OpenSenseMap API Documentation                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| [`postNewMeasurement()`](https://julianwowra.github.io/opensensemap-client/functions/postNewMeasurement.html)                     | Post new measurement                  | [API Doc](https://docs.opensensemap.org/#api-Measurements-postNewMeasurement)           |
| [`getData()`](https://julianwowra.github.io/opensensemap-client/functions/getData.html)                                           | Get latest measurements for a sensor  | [API Doc](https://docs.opensensemap.org/#api-Measurements-getData)                      |
| [`deleteMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/deleteMeasurements.html)                     | Delete measurements of a sensor       | [API Doc](https://docs.opensensemap.org/#api-Measurements-deleteMeasurements)           |
| [`getDataByGroupTag()`](https://julianwowra.github.io/opensensemap-client/functions/getDataByGroupTag.html)                       | Get measurements for a grouptag       | [API Doc](https://docs.opensensemap.org/#api-Measurements-getDataByGroupTag)            |
| [`getDataMulti()`](https://julianwowra.github.io/opensensemap-client/functions/getDataMulti.html)                                 | Get measurements for a phenomenon     | [API Doc](https://docs.opensensemap.org/#api-Measurements-getDataMulti)                 |
| [`getLatestMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/getLatestMeasurements.html)               | Get latest measurements of a senseBox | [API Doc](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements)        |
| [`getLatestMeasurementOfSensor()`](https://julianwowra.github.io/opensensemap-client/functions/getLatestMeasurementOfSensor.html) | Get latest measurements of a sensor   | [API Doc](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor) |
| [`postNewMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/postNewMeasurements.html)                   | Post multiple new measurements        | [API Doc](https://docs.opensensemap.org/#api-Measurements-postNewMeasurements)          |

### Users

| Function                                                                                                                | Description               | OpenSenseMap API Documentation                                                |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| [`register()`](https://julianwowra.github.io/opensensemap-client/functions/register.html)                               | Register new user         | [API Doc](https://docs.opensensemap.org/#api-Users-register)                  |
| [`deleteUser()`](https://julianwowra.github.io/opensensemap-client/functions/deleteUser.html)                           | Delete user and all boxes | [API Doc](https://docs.opensensemap.org/#api-Users-deleteUser)                |
| [`getUser()`](https://julianwowra.github.io/opensensemap-client/functions/getUser.html)                                 | Get user details          | [API Doc](https://docs.opensensemap.org/#api-Users-getUser)                   |
| [`refreshAuth()`](https://julianwowra.github.io/opensensemap-client/functions/refreshAuth.html)                         | Refresh Authorization     | [API Doc](https://docs.opensensemap.org/#api-Users-refresh_auth)              |
| [`signIn()`](https://julianwowra.github.io/opensensemap-client/functions/signIn.html)                                   | Sign in                   | [API Doc](https://docs.opensensemap.org/#api-Users-sign_in)                   |
| [`signOut()`](https://julianwowra.github.io/opensensemap-client/functions/signOut.html)                                 | Sign out                  | [API Doc](https://docs.opensensemap.org/#api-Users-sign_out)                  |
| [`updateUser()`](https://julianwowra.github.io/opensensemap-client/functions/updateUser.html)                           | Update user details       | [API Doc](https://docs.opensensemap.org/#api-Users-updateUser)                |
| [`confirmEmail()`](https://julianwowra.github.io/opensensemap-client/functions/confirmEmail.html)                       | Confirm email address     | [API Doc](https://docs.opensensemap.org/#api-Users-confirm_email)             |
| [`getUserBox()`](https://julianwowra.github.io/opensensemap-client/functions/getUserBox.html)                           | Get specific box of user  | [API Doc](https://docs.opensensemap.org/#api-Users-getUserBox)                |
| [`getUserBoxes()`](https://julianwowra.github.io/opensensemap-client/functions/getUserBoxes.html)                       | List all boxes of user    | [API Doc](https://docs.opensensemap.org/#api-Users-getUserBoxes)              |
| [`resendEmailConfirmation()`](https://julianwowra.github.io/opensensemap-client/functions/resendEmailConfirmation.html) | Resend email confirmation | [API Doc](https://docs.opensensemap.org/#api-Users-resend_email_confirmation) |
| [`requestPasswordReset()`](https://julianwowra.github.io/opensensemap-client/functions/requestPasswordReset.html)       | Request password reset    | [API Doc](https://docs.opensensemap.org/#api-Users-request_password_reset)    |
| [`passwordReset()`](https://julianwowra.github.io/opensensemap-client/functions/passwordReset.html)                     | Reset password            | [API Doc](https://docs.opensensemap.org/#api-Users-password_reset)            |

### Other Functions

| Function                                                                                            | Description                    | OpenSenseMap API Documentation                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| [`calculateIdw()`](https://julianwowra.github.io/opensensemap-client/functions/calculateIdw.html)   | Get IDW Interpolation          | [API Doc](https://docs.opensensemap.org/#api-Interpolation-calculateIdw) |
| [`getStatistics()`](https://julianwowra.github.io/opensensemap-client/functions/getStatistics.html) | Get database statistics        | [API Doc](https://docs.opensensemap.org/#api-Misc-getStatistics)         |
| [`printRoutes()`](https://julianwowra.github.io/opensensemap-client/functions/printRoutes.html)     | Print all routes               | [API Doc](https://docs.opensensemap.org/#api-Misc-printRoutes)           |
| [`descriptive()`](https://julianwowra.github.io/opensensemap-client/functions/descriptive.html)     | Compute descriptive statistics | [API Doc](https://docs.opensensemap.org/#api-Statistics-descriptive)     |

You can find more information in the [full documentation 📖](https://julianwowra.github.io/opensensemap-client/).

## OpenSenseMap API documentation

This library was created with a lot of work, reading the code from the [OpenSenseMap-API](https://github.com/sensebox/openSenseMap-API) by hand. In addition, this library provides an [Insomnia](https://insomnia.rest/) file for debugging purposes.

**[📄 Insomnia file](https://github.com/JulianWowra/opensensemap-client/blob/main/insomnia.yml)**

Import this file into Insomnia, install the plugins [`customtimestamp`](https://insomnia.rest/plugins/insomnia-plugin-customtimestamp) and [`save-variables`](https://insomnia.rest/plugins/insomnia-plugin-save-variables) and configure the environments if you needed. You are ready!

---

## Author

👤 **Julian Wowra <development@julianwowra.de>**

- Github: [@JulianWowra](https://github.com/JulianWowra)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/JulianWowra/opensensemap-client/issues). You can also take a look at the [contributing guide](https://github.com/JulianWowra/opensensemap-client/blob/main/CONTRIBUTING.md).

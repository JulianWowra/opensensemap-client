# openSenseMap Client

Based on API version: `v11.3.0`

[![NPM](https://nodei.co/npm/opensensemap-client.png)](https://npmjs.org/package/opensensemap-client)

## Install

```
npm install opensensemap-client
```

```
pnpm install opensensemap-client
```

```
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

- **Introduction**
- **Boxes**
  - [Get one senseBox](https://docs.opensensemap.org/#api-Boxes-getBox)
    - _Function:_ [`getBox()`](https://julianwowra.github.io/opensensemap-client/functions/getBox.html)
  - [Get all senseBoxes](https://docs.opensensemap.org/#api-Boxes-getBoxes)
    - _Function:_ [`getBoxes()`](https://julianwowra.github.io/opensensemap-client/functions/getBoxes.html)
  - [Post new senseBox](https://docs.opensensemap.org/#api-Boxes-postNewBox)
    - _Function:_ [`postNewBox()`](https://julianwowra.github.io/opensensemap-client/functions/postNewBox.html)
  - [Update a senseBox](https://docs.opensensemap.org/#api-Boxes-updateBox)
    - _Function:_ [`updateBox()`](https://julianwowra.github.io/opensensemap-client/functions/updateBox.html)
  - [Mark a senseBox and its measurements for deletion](https://docs.opensensemap.org/#api-Boxes-deleteBox)
    - _Function:_ [`deleteBox()`](https://julianwowra.github.io/opensensemap-client/functions/deleteBox.html)
  - [Get all senseBox tags](https://docs.opensensemap.org/#api-Boxes-getAllTags)
    - _Function:_ [`getAllTags()`](https://julianwowra.github.io/opensensemap-client/functions/getAllTags.html)
  - [Claim a senseBox marked for transfer](https://docs.opensensemap.org/#api-Boxes-claimBox)
    - _Function:_ [`claimBox()`](https://julianwowra.github.io/opensensemap-client/functions/claimBox.html)
  - [Download the Arduino script for your senseBox](https://docs.opensensemap.org/#api-Boxes-getSketch)
    - _Function:_ [`getSketch()`](https://julianwowra.github.io/opensensemap-client/functions/getSketch.html)
  - [Get locations of a senseBox](https://docs.opensensemap.org/#api-Boxes-getBoxLocations)
    - _Function:_ [`getBoxLocations()`](https://julianwowra.github.io/opensensemap-client/functions/getBoxLocations.html)
  - [Get transfer information for a senseBox](https://docs.opensensemap.org/#api-Boxes-getTransfer)
    - _Function:_ [`getTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/getTransfer.html)
  - [Mark a senseBox for transferring to a different user](https://docs.opensensemap.org/#api-Boxes-createTransfer)
    - _Function:_ [`createTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/createTransfer.html)
  - [Revoke transfer token and remove senseBox from transfer](https://docs.opensensemap.org/#api-Boxes-removeTransfer)
    - _Function:_ [`removeTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/removeTransfer.html)
  - [Update a transfer token](https://docs.opensensemap.org/#api-Boxes-updateTransfer)
    - _Function:_ [`updateTransfer()`](https://julianwowra.github.io/opensensemap-client/functions/updateTransfer.html)
- **Interpolation**
  - [Get a Inverse Distance Weighting Interpolation as FeatureCollection](https://docs.opensensemap.org/#api-Interpolation-calculateIdw)
    - _Function:_ [`calculateIdw()`](https://julianwowra.github.io/opensensemap-client/functions/calculateIdw.html)
- **Measurements**
  - [Post new measurement](https://docs.opensensemap.org/#api-Measurements-postNewMeasurement)
    - _Function:_ [`postNewMeasurement()`](https://julianwowra.github.io/opensensemap-client/functions/postNewMeasurement.html)
  - [Get the 10000 latest measurements for a sensor](https://docs.opensensemap.org/#api-Measurements-getData)
    - _Function:_ [`getData()`](https://julianwowra.github.io/opensensemap-client/functions/getData.html)
  - [Delete measurements of a sensor](https://docs.opensensemap.org/#api-Measurements-deleteMeasurements)
    - _Function:_ [`deleteMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/deleteMeasurements.html)
  - [Get latest measurements for a grouptag as JSON](https://docs.opensensemap.org/#api-Measurements-getDataByGroupTag)
    - _Function:_ [`getDataByGroupTag()`](https://julianwowra.github.io/opensensemap-client/functions/getDataByGroupTag.html)
  - [Get latest measurements for a phenomenon as CSV](https://docs.opensensemap.org/#api-Measurements-getDataMulti)
    - _Function:_ [`getDataMulti()`](https://julianwowra.github.io/opensensemap-client/functions/getDataMulti.html)
  - [Get latest measurements of a senseBox](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements)
    - _Function:_ [`getLatestMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/getLatestMeasurements.html)
  - [Get latest measurements of a sensor](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor)
    - _Function:_ [`getLatestMeasurementOfSensor()`](https://julianwowra.github.io/opensensemap-client/functions/getLatestMeasurementOfSensor.html)
  - [Post multiple new measurements](https://docs.opensensemap.org/#api-Measurements-postNewMeasurements)
    - _Function:_ [`postNewMeasurements()`](https://julianwowra.github.io/opensensemap-client/functions/postNewMeasurements.html)
- **Misc**
  - [Get some statistics about the database](https://docs.opensensemap.org/#api-Misc-getStatistics)
    - _Function:_ [`getStatistics()`](https://julianwowra.github.io/opensensemap-client/functions/getStatistics.html)
  - [print all routes](https://docs.opensensemap.org/#api-Misc-printRoutes)
    - _Function:_ [`printRoutes()`](https://julianwowra.github.io/opensensemap-client/functions/printRoutes.html)
- **Statistics**
  - [Compute basic descriptive statistics over specified time windows](https://docs.opensensemap.org/#api-Statistics-descriptive)
    - _Function:_ [`descriptive()`](https://julianwowra.github.io/opensensemap-client/functions/descriptive.html)
- **Users**
  - [Register new](https://docs.opensensemap.org/#api-Users-register)
    - _Function:_ [`register()`](https://julianwowra.github.io/opensensemap-client/functions/register.html)
  - [Delete user, all of its boxes and all of its boxes measurements](https://docs.opensensemap.org/#api-Users-deleteUser)
    - _Function:_ [`deleteUser()`](https://julianwowra.github.io/opensensemap-client/functions/deleteUser.html)
  - [Get details](https://docs.opensensemap.org/#api-Users-getUser)
    - _Function:_ [`getUser()`](https://julianwowra.github.io/opensensemap-client/functions/getUser.html)
  - [Refresh Authorization](https://docs.opensensemap.org/#api-Users-refresh_auth)
    - _Function:_ [`refreshAuth()`](https://julianwowra.github.io/opensensemap-client/functions/refreshAuth.html)
  - [Sign in](https://docs.opensensemap.org/#api-Users-sign_in)
    - _Function:_ [`signIn()`](https://julianwowra.github.io/opensensemap-client/functions/signIn.html)
  - [Sign out](https://docs.opensensemap.org/#api-Users-sign_out)
    - _Function:_ [`signOut()`](https://julianwowra.github.io/opensensemap-client/functions/signOut.html)
  - [Update user details](https://docs.opensensemap.org/#api-Users-updateUser)
    - _Function:_ [`updateUser()`](https://julianwowra.github.io/opensensemap-client/functions/updateUser.html)
  - [confirm email address](https://docs.opensensemap.org/#api-Users-confirm_email)
    - _Function:_ [`confirmEmail()`](https://julianwowra.github.io/opensensemap-client/functions/confirmEmail.html)
  - [get specific box of the signed in user](https://docs.opensensemap.org/#api-Users-getUserBox)
    - _Function:_ [`getUserBox()`](https://julianwowra.github.io/opensensemap-client/functions/getUserBox.html)
  - [list all boxes and sharedBoxes of the signed in user](https://docs.opensensemap.org/#api-Users-getUserBoxes)
    - _Function:_ [`getUserBoxes()`](https://julianwowra.github.io/opensensemap-client/functions/getUserBoxes.html)
  - [request a resend of the email confirmation](https://docs.opensensemap.org/#api-Users-resend_email_confirmation)
    - _Function:_ [`resendEmailConfirmation()`](https://julianwowra.github.io/opensensemap-client/functions/resendEmailConfirmation.html)
  - [request password reset](https://docs.opensensemap.org/#api-Users-request_password_reset)
    - _Function:_ [`requestPasswordReset()`](https://julianwowra.github.io/opensensemap-client/functions/requestPasswordReset.html)
  - [reset password with passwordResetToken](https://docs.opensensemap.org/#api-Users-password_reset)
    - _Function:_ [`passwordReset()`](https://julianwowra.github.io/opensensemap-client/functions/passwordReset.html)

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

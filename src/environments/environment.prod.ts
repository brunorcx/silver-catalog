export const environment = {
  production: true,
  firebase: {
    apiKey: process.env["FIRE_API_KEY"] || "",
    authDomain: process.env["FIRE_AUTH_DOMAIN"] || "",
    projectId: process.env["FIRE_PROJECT_ID"] || "",
    storageBucket: process.env["FIRE_STORAGE_BUCKET"] || "",
    messagingSenderId: process.env["FIRE_MESSAGING_SENDER_ID"] || "",
    appId: process.env["FIRE_APP_ID"] || "",
    measurementId: process.env["FIRE_MEASUREMENT_ID"] || "",
  },

  apiUri: process.env["AUTH_CONFIG_API_URI"] || "",
  appUri: process.env["AUTH_CONFIG_APP_URI"] || "",
  errorPath: process.env["AUTH_CONFIG_ERROR_PATH"] || "",
};

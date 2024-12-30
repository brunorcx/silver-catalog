import firebaseConfig from "../../firebase_config.json";
import authConfig from "../../auth_config.json";

export const environment = {
  production: false,
  firebase: {
    ...firebaseConfig,
  },

  apiUri: authConfig.apiUri,
  appUri: authConfig.appUri,
  errorPath: authConfig.errorPath,
};

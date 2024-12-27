import firebaseConfig from "../../firebase_config.json";

export const environment = {
  production: false,
  firebase: {
    ...firebaseConfig,
  },
};

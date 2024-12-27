import firebaseConfig from "../../firebase_config.json";

export const environment = {
  production: true,
  firebase: {
    ...firebaseConfig,
  },
};

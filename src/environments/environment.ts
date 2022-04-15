import {environment as prodEnvironment, Environment} from "./environment.prod";

export const environment: Environment = {
  ...prodEnvironment,
  production: false,
  apiUrl: 'https://therapy-manager.herokuapp.com',
  cookieKey: 'th_dev_',
};

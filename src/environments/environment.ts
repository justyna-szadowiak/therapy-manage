import {environment as prodEnvironment, Environment} from "./environment.prod";

export const environment: Environment = {
  ...prodEnvironment,
  production: false,
  apiUrl: 'http://localhost:3000',
  cookieKey: 'th_dev_',
};

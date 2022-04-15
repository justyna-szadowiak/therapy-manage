export interface Environment {
  production: boolean;
  apiUrl: string;
  cookieKey: string;
}

export const environment: Environment = {
  production: true,
  apiUrl: 'https://therapy-manager.herokuapp.com',
  cookieKey: 'th'
};

import packageJson from '../../package.json';

export const ENV = {
  VERSION: packageJson.version || '',
  NODE_ENV: process.env.NODE_ENV,
  API_HOST: 'http://35.88.141.255:4000/api/',
  URL_IMAGE_DEFAULT:
    'https://res.cloudinary.com/monstarlab777/image/upload/v1651456550/1-13_x7rcqz.png',
  API_KEY_FIREBASE: 'AIzaSyATQsqjwLx6sl65VhsDTXE3nirmiqU8_gw',
  AUTH_DOMAIN: 'food-app-71dd2.firebaseapp.com',
  DATABASE_URL:
    'https://food-app-71dd2-default-rtdb.asia-southeast1.firebasedatabase.app',
  PROJECT_ID: 'food-app-71dd2',
  STORAGE_BUCKET: 'food-app-71dd2.appspot.com',
  MESSAGING_SENDER_ID: '606100025440',
  APP_ID: '1:606100025440:web:098d416f21356e5b9dd305',
  MEASUREMENT_ID: 'G-FXQ89MQQY3',
  HOST_SOCKET: 'https://socketfoodapp.herokuapp.com/'
};

/* eslint-disable no-console */
import reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = reactotron
    .configure({ host: '192.168.0.44' })
    .useReactNative()
    .connect();

  console.tron = tron;
}

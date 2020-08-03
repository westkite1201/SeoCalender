import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig';

//get key
export const getVapidPublicKey = () => {
  return axios.post('http://localhost:3031/api/webpush/getVapidPublicKey');
};

export const pushSend = (subscription, param) => {
  let data = {
    subscribe_value: JSON.stringify(subscription),
    data: JSON.stringify(param)
  };
  return axios.post('http://localhost:3031/api/webpush/push-send', data);
};

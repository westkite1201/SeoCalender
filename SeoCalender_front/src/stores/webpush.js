import { observable, action, computed } from 'mobx';
import * as webpushApi from '../lib/api/webpushApi';
let vapidPublicKey = '';
let convertedVPkey = '';
export default class webpushStore {
  @observable buttonView = false;
  @observable isSubscribed = false;
  @observable lodingSubscribe = false;
  @observable subscription = '';
  @observable swRegistration = null;

  //base64 코드를 Uint8Array 변환
  urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  getkey = async () => {
    try {
      const response = await webpushApi.getVapidPublicKey();
      if (response.status === 200) {
        console.log('[SEO][Navigation] key', response);
        const { key } = response.data;
        return key;
      }
    } catch (e) {
      console.log(e);
    }
  };
  @action
  initServiceWorker = async () => {
    //ket 가져오기
    this.vapidPublicKey = await this.getkey();
    //인코딩
    this.convertedVPkey = this.urlB64ToUint8Array(this.vapidPublicKey);

    console.log(
      '[SEO][componentDidMount] vapidPublicKey ',
      this.vapidPublicKey
    );
    console.log(
      '[SEO][componentDidMount] convertedVPkey ',
      this.convertedVPkey
    );
    /* 서비스 워커 이니셜 라이징  */
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        let swReg = await navigator.serviceWorker.register('/sw.js');
        //'Service Worker is registered'
        this.swRegistration = swReg;
        this.initialiseUI();
      } catch (error) {
        console.error('Service Worker Error', error);
      }
    } else {
      console.warn('Push messaging is not supported');
    }
  };

  //ui 세팅
  @action
  initialiseUI = async () => {
    // Set the initial subscription value
    let subscription = await this.swRegistration.pushManager.getSubscription();
    subscription === null
      ? (this.isSubscribed = true)
      : (this.isSubscribed = false);
  };

  @action
  subscribe = async () => {
    let applicationServerKey;
    applicationServerKey = this.convertedVPkey;
    let subscription = await this.swRegistration.pushManager.subscribe({
      applicationServerKey: applicationServerKey,
      userVisibleOnly: true
    });
    this.subscription = subscription;
  };
  @action
  subscribeAndPushSend = async () => {
    let applicationServerKey;
    applicationServerKey = this.convertedVPkey;
    console.log('[SEO][subscribeAndPushSend]', applicationServerKey);
    try {
      let subscription = await this.swRegistration.pushManager.subscribe({
        applicationServerKey: applicationServerKey,
        userVisibleOnly: true
      });
      console.log('[SEO][subscribeUser] subscription', subscription);
      //웹서버에 푸쉬 -노티피케이션을 FCM에게 요청한다.
      let param = {
        title: '구독!',
        body: '앞으로 oneDropInk의 알림을 받아 볼 수 있으세요!😘'
      };
      const response = await webpushApi.pushSend(subscription, param);
      if (response.status === 200) {
        console.log('[SEO][subscribeUser] response', response);
      }
      this.isSubscribed = true;
    } catch (e) {
      console.log('error', e);
      this.isSubscribed = false;
    }
  };

  @action
  unsubscribe = async () => {
    try {
      let subscription = await this.swRegistration.pushManager.getSubscription();
      console.log('subscription ', subscription);
      if (subscription) {
        this.isSubscribed = false;
        console.log('unSub');
        return subscription.unsubscribe();
      }
    } catch (error) {
      console.log('Error unsubscribing', error);
    }
  };
}

import { observable, action, computed } from 'mobx';

export default class webpushStore{

    @observable timerMap = new Map();
    @observable socket = ''
    @observable chatSocket = ''

    
    //base64 코드를 Uint8Array 변환
     urlB64ToUint8Array =(base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return(outputArray)
    }

    initServiceWorker = async() => {
        vapidPublicKey = await this.getkey()
        convertedVPkey =  urlB64ToUint8Array(vapidPublicKey);
        console.log('[SEO][componentDidMount] vapidPublicKey ', vapidPublicKey)
        console.log('[SEO][componentDidMount] convertedVPkey ', convertedVPkey)
        /* 서비스 워커 이니셜 라이징  */
        if ('serviceWorker' in navigator && 'PushManager' in window) {
                navigator.serviceWorker.register('/sw.js').then(
                    (swReg) => {
                        //'Service Worker is registered'
                        swRegistration = swReg;
                        console.log('oooooo!',swReg)
                        this.initialiseUI();
                }).catch(
                    (error) => {
                        console.error('Service Worker Error', error);
                });
        }else{
                console.warn('Push messaging is not supported');
        }
    }



    @action
    setStartStopTimer = (name, idx) => {
        this.timerMap[name +'_' +idx].checked = !this.timerMap[name +'_' +idx].checked
    }

    

}
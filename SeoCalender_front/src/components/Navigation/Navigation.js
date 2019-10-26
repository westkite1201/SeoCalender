import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import axios from 'axios'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import * as webpushApi from '../../lib/api/webpushApi'
import './Navigation.scss'



//base64 코드를 Uint8Array 변환
const urlB64ToUint8Array =(base64String) => {
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

let swRegistration = null;
let isSubscribed = false;
let vapidPublicKey = ''
let convertedVPkey = ''
@observer
class Navigation extends Component {
    @observable button = '';
    @observable key = '';
    
    componentDidMount = async() =>{
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
    getkey = async() => {
        try{
            const response = await webpushApi.getVapidPublicKey()
            if(response.status === 200){
                console.log("[SEO][Navigation] key", response)
                const { key } = response.data;
                return key;
            }
        }catch(e){
            console.log(e)
        }
    }
    
    initialiseUI = () => {
        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
        .then((subscription) => {
            isSubscribed = !(subscription === null);
            if (isSubscribed) {
                //'User IS subscribed.'
                this.button = <NotificationsActiveIcon onClick = {this.unsubscribeUser} />
                console.log('issubscribed')
            } else {
                this.button = <NotificationsOffIcon onClick = {this.subscribeUser} />
                console.log('unsubscribed')
            }
        });
    }
    subscribeUser = async () => {
        console.log("[SEO][subscribeUser]")
        let applicationServerKey;
        applicationServerKey = convertedVPkey;
        try {
            isSubscribed = true;
            let subscription = await swRegistration.pushManager.subscribe({
                applicationServerKey: applicationServerKey,
                userVisibleOnly     : true,
            })
            console.log("[SEO][subscribeUser] subscription" , subscription)
            //웹서버에 푸쉬 -노티피케이션을 FCM에게 요청한다.
            const response = await webpushApi.pushSend(subscription)
            if(response.status === 200){
                console.log("[SEO][subscribeUser] response", response)
                const { key } = response.data;
                return key;
            }
            
            
            
            this.button = <NotificationsActiveIcon onClick = {this.unsubscribeUser} />
        }catch(e){
            console.log(e)
            isSubscribed = false;
        }


       
        // .then((subscription) => {
        //     //'User is subscribed:'
        //     isSubscribed = true;
        //     axios.put("/api/user/subscribe_info", 
        //         { subscribe_value: JSON.stringify(subscription)},
        //         { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
        //     ).then((res) => {
        //           console.log(res);
        //     });
            
        //         this.button = <NotificationsActiveIcon onClick = {this.unsubscribeUser} />
        //     })
        //     .catch((err) => {
        //         console.log('Failed to subscribe the user: ', err);
        //     });
    }
    unsubscribeUser = () => {
        swRegistration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            // axios.delete("/api/user/subscribe_info", 
            //     { headers: {'Authorization': 'bearer '+ localStorage.getItem('jwt')}}
            // ).then((res) => {
            //     console.log(res);
            // });
            this.button = <NotificationsOffIcon onClick = {this.subscribeUser}/>
            return subscription.unsubscribe();
          }
        })
        .catch((error) => {
          console.log('Error unsubscribing', error);
        })
        .then(() => {
          //updateSubscriptionOnServer(null);
          //'User is unsubscribed.'
          isSubscribed = false;
        });
    }
    // urlB64ToUint8Array =(base64String) => {
    //     const promise = new Promise(
    //         (resolve, reject) => {
    //             const padding = '='.repeat((4 - base64String.length % 4) % 4);
    //             const base64 = (base64String + padding)
    //             .replace(/\-/g, '+')
    //             .replace(/_/g, '/');
    //             const rawData = window.atob(base64);
    //             const outputArray = new Uint8Array(rawData.length);
    //             for (let i = 0; i < rawData.length; ++i) {
    //                 outputArray[i] = rawData.charCodeAt(i);
    //             }
    //             resolve(outputArray)
    //         }
    //     )
        
    //     return promise;
    // }
    render() {
        return (
            <div className = 'wrapperRoot'>
                {this.button}
            </div>
        )
    }
}
export default Navigation
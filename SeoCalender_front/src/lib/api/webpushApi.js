import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

//get key
export const getVapidPublicKey = () =>{
   return (axios.post("http://localhost:3031/api/webpush/getVapidPublicKey")) 
}

export const pushSend = (subscription) =>{
    let data = {
        subscribe_value : JSON.stringify(subscription),
        data : JSON.stringify({
            title : 'TITLE',
            body : 'push send test'
        })
    }
    return (axios.post("http://localhost:3031/api/webpush/push-send",data)) 
 }
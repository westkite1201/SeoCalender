var express = require('express');
var router = express.Router();
const webpush = require('web-push')

//web push 프로토콜에서 요구 되는 암호키 
//base64로 인코딩 되어서 나옴 
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey('AIzaSyCXHVI68TVPlBZ-UFAcS1Z83DJ2Y4uRtEc');
webpush.setVapidDetails(
	'mailto:nowindesire@gmail.com',
	vapidKeys.publicKey, // 
	vapidKeys.privateKey
);
/* key 가져오기  */
router.post('/getVapidPublicKey',  async(req, res) => {
    try{
        return res.json({key : vapidKeys.publicKey})
    }catch(e){
      console.log('error' ,e)
    }
})

router.post('/push-send',  async(req, res) => {
    const requestData = req.body;
    //console.log(requestData);
    const subscription = JSON.parse(requestData.subscribe_value);
    const payload = new Buffer.from(requestData.data, 'utf8') 

    //console.log(payload)
    const options = {
        TTL: 24 * 60 * 60,
        vapidDetails: {
          subject: 'mailto:nowindesire@gmail.com',
          publicKey: vapidKeys.publicKey,
          privateKey: vapidKeys.privateKey
        }
      };
    try{
        webpush.sendNotification(subscription, payload, options)
        //console.log(subscription)
        res.send({ message: 'ok',
                   statusCode : 200})
    }catch(e){
      console.log('error' ,e)
    }
})



module.exports = router;



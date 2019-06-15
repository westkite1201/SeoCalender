import { observable, action, computed } from 'mobx';
import io from 'socket.io-client';

export default class TimerStore{
    //time 객체 
    // {
    //     nameCode: '', //기기명 코드 
    //     number: '',   // 번호 
    //     time: '',     // 시간 
    //     msg : '' // 서버에 보낼 메세지 
    //     checked : '' //스위치 체킹
    // }
    @observable timerMap = new Map();
    @observable socket = ''
    @observable chatSocket = ''
    clockObj = { hour : '' , minute : ' ' , second : ' '}



    @action
    setStartStopTimer = (name, idx) => {
        this.timerMap[name +'_' +idx].checked = !this.timerMap[name +'_' +idx].checked
    }
    //socketConnection
    @action
    setSocketConnection = () => {
        console.log('hello')
        const socket = io('http://localhost:3031/timer');
        const chatSocket = io('http://localhost:3031/chat');
       // console.log(socket)
        socket.on('connection',() =>{ console.log('connected')});
        // then
        socket.emit("chat", 'hello');
        socket.on("chat", function(data) {
            console.log('Message from Server: ' + data);
        });
        socket.on("timer", function(data) {
            console.log('Message from Server: ' + data);
        });
        this.socket = socket;
        this.chatSocket = chatSocket;
        this.chatMessage();

        
        //this.timerMessage('name', 1, 1000);
    }

    @action
    chatMessage = () => {
        console.log(this.chatSocket)
        // 서버로 자신의 정보를 전송한다.
        this.chatSocket.emit("chat", {
            name: 'heelo',
            room: 'ssss',
            msg: 'hello'
        });
           // 서버로부터의 메시지가 수신되면
        this.chatSocket.on("chat", function(data) {
            console.log(data)
        });
    }



    //connection 용
    @action
    timerSetting = (timerObj) =>{
        console.log( "timer timerSetting")
        //1.setting timer 
        let timerIdentifier = timerObj.name + "_" +timerObj.number
       // console.log(this.timerMap.get(timerIdentifier))
        
        this.timerMap.set(timerIdentifier, { 
                name: timerObj.name, //기기명 코드 
                number: timerObj.number,   // 번호 
                time: timerObj.time,     // 시간 
                msg : timerObj.msg, // 서버에 보낼 메세지 
                checked : timerObj.checked, //스위치 체킹
                remainTime  : {},
        })
    }
    @action
    startTimer = (timerObj) =>{
        console.log("startTimer!")
        console.log(timerObj.name)
        this.socket.emit("startTimer",{
            name: timerObj.name,
            room: timerObj.name+ "_"+ timerObj.number,
            count : timerObj.time
        })
        // 서버로부터의 메시지가 수신되면
        this.socket.on("startTimer", (data)=> {
            console.log('timer return', data.countdown)
            let timerIdentifier = timerObj.name + "_" +timerObj.number

            this.timerMap.get(timerIdentifier).remainTime = this.getTimeCovert(data.countdown);
            //this.time[data.room] = data.countdown
        });
    }

    @action 
    stopTimer = (timerObj) => {
        console.log("stopTimer!")
        this.socket.emit("stopTimer",{
            name: timerObj.name,
            room: timerObj.name+ "_"+ timerObj.number,
        })
        // 서버로부터의 메시지가 수신되면
        this.socket.on("stopTimer", (data)=> {
            console.log('timer return', data)
            //this.time[data.room] = data.countdown
        });

    }



    @action 
    getTimeCovert = (timerNumber) => {
        let n = timerNumber
        let minute = n / 60;
        console.log(3722/60);
        let second = n % 60;
        let hour = 0;
        if( minute >= 60){
            hour = minute / 60;
            minute = minute % 60 ;
        }
        console.log(parseInt(hour) , parseInt(minute), second ) 
        
        return { hour : parseInt(hour),
                 minute : parseInt(minute),
                 second : parseInt(second) }
    }
    

}
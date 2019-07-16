import { observable, action, computed } from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import * as calenderApi from '../lib/api/calenderApi'
export default class CalenderStore{
    //일단 클라이언트 단에서 설정하는 걸로 
    @observable year = parseInt( moment().format('YYYY') )
    @observable month =  parseInt( moment().format('M') )
    @observable day = ''



    @observable currentDate = ''
    @observable currentSelectYear =''
    @observable currentSelectMonth =''
    
    @observable selectedArr = [];
    @observable monthArray = [];
    @observable showPopup = false;

    @observable background = "#B80000" 


    @observable editMode = false;
    @observable editTitle = '';

    @observable calenderObjectMap = new Map();
    @observable calenderObjList = [];
    @observable calenderObject = { 
        date : '',
        title : '',
        background: '#B80000',
        description : ''
    }



    @action
    modifySelectBlock = (key, currentDate) => {
        let calenderObjList = this.calenderObjectMap.get(currentDate) 
        this.editTitle = calenderObjList[key].title;
        this.editMode = !this.editMode
    }
    @action
    removeSelectBlock = (key, currentDate) => {
        console.log(key, currentDate)
        let calenderObjList = this.calenderObjectMap.get(currentDate) 
        calenderObjList = calenderObjList.filter((item, index) =>{
            //console.log('item', item, index )
            return( index !== key )
        })
        this.calenderObjectMap.set(currentDate, calenderObjList) 
    }



    @action
    setSelectedArr = (day) => {
        this.day = day;
    }


    @action 
    setBackgroundColor = (color) => { 
        this.background = color.hex
        this.calenderObject.background = color.hex
    }

    @action
    togglePopup = (day, date) => {
        console.log( moment(date).format('M') ) ;
        console.log("togglePopup ")
        let s = !this.showPopup;
        this.showPopup = s;
        this.day = day;
        this.currentDate = date;
        this.currentSelectYear = moment(date).format('YYYY')
        this.currentSelectMonth = moment(date).format('MM')

    }
    @action
    closePopup = () => {
        
        console.log("togglePopup ")
        this.showPopup = false

    }
    @action 
    changeEditTitle = (title) =>{
        this.editTitle = title; 
    }   

    @action 
    changeTitle = (title) =>{
        this.calenderObject.title = title; 
    }   

    /* 캘린더 현재 달 , +- 1 가져오기  */
    getCalenderTodo = async() =>{

    }



    @action
    changeDate = (e) =>{
        const { year, month } = this;
        console.log(year , " " , month)
        let stateYear = year;
        let stateMonth = month;
        let nowYear;
        let nowMonth;
        console.log(e.target.name)
        if ( e.target.name === 'before'){
            if ( month - 1 === 0){
                 nowYear = stateYear - 1; 
                 nowMonth = 12;
            }else{
                 nowYear = stateYear
                 nowMonth = stateMonth - 1;
            }
        }else if ( e.target.name === 'after'){
            if( month + 1 === 13 ){
                 nowYear = stateYear + 1;
                 nowMonth = 1
            }else{
                 nowYear = stateYear;
                 nowMonth = stateMonth + 1 ;
            }
        }
        console.log(nowYear, nowMonth)
   
        this.year = nowYear
        this.month = nowMonth
        this.getDaysArrayByMonth();
        
    }


    /* 캘린더 추가  */
    @action
    concatCalendar = async(date) => {
        console.log("concatCalendar" , date)
        this.calenderObject.date = date;
        try{ 
            const response = await calenderApi.insertCalenderTodo( this.calenderObject )
            if(response.status == 200){
                const getCalenderResponse = await calenderApi.getCalender( date );
                console.log(getCalenderResponse)

            }
        }catch(e){
            console.log(e)
        }
        

        let calenderObjListClone = _.isNil(this.calenderObjectMap.get(date) ) ? [] : this.calenderObjectMap.get(date) 
        calenderObjListClone.push(this.calenderObject);
        this.calenderObjectMap.set(date, calenderObjListClone);

        this.calenderObject = {
            date : '',
            background : this.background,
            title : '',
            description : ''
        } //초기화
    }





    /* - calender Maker  -*/
    getDaysArrayByMonthBefore = (month, left) => {
        let daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
        let count = daysInMonth - left
        let arrDays = [];
        console.log("daysInMonth ", daysInMonth)
        while(daysInMonth !== count ) {
          let current = moment(month).date(daysInMonth);
          arrDays.push(current);
          daysInMonth--;
        }
        return arrDays;
    }
    //이후 
    getDaysArrayByMonthAfter = (month, left) => {
        let arrDays = [];
        let idx = 1;
        while(idx !== left  ) {
          let current = moment(month).date(idx);
          arrDays.push(current);
          idx++;
        }
        console.log("AFTER arrDAYS" ,arrDays)
        return arrDays;
    }


    isHoliday = (date) =>{
        //토요일, 일요일인 경우
        //console.log(date)
        let day = moment(date).format('dddd');
        console.log(day)
        if ( day === "Sunday"){
            return 'Sunday';
        }
        if ( day === "Saturday"){
            return 'Saturday';
        }

        else{
            return false;
        }
    }

    @action
    getDaysArrayByMonth = () => {
        //const {year , month} = this.state; 
        let year = this.year
        let month = this.month
        let str = year + "-" + month
        
        let beforeMonth = moment(str).subtract(1, 'month').format('YYYY-MM');
        let afterMonth = moment(str).add(1, 'month').format('YYYY-MM');
        // console.log(beforeMonth)
        // console.log(afterMonth)
        //시작, 끝날짜 알기 
        const startOfMonth = moment(str).startOf('month').format('dddd');
        const endOfMonth   = moment(str).endOf('month').format('dddd');
        
        //첫째날 날짜 숫자로 환산
        let firstDayNumber = moment(str).startOf('month').day();
        // console.log(firstDayNumber)
        // console.log("startOfMonth",startOfMonth )
        // console.log("beforeMonth", endOfMonth)
        let concatBeforeMonth = []
        //시작 날짜가 일요일이 아닌경우 
        // 월요일이 1이므로 //일요일이면 아무것도 추가할 필요없음 
        if( startOfMonth !== "Sunday"){
            console.log( firstDayNumber )
            concatBeforeMonth= this.getDaysArrayByMonthBefore(beforeMonth,firstDayNumber);
            console.log("concatBeforeMonth", concatBeforeMonth)
        }
        // //현재 날짜 
        let daysInMonth = moment(str, 'YYYY-MM').daysInMonth();
        let arrDays = [];

        while(daysInMonth) {
          let current = moment(str).date(daysInMonth);
          arrDays.push({date : current , now : true });
          daysInMonth--;
        }

        arrDays = arrDays.reverse();
        console.log('arrDays!' , arrDays.slice())
        for(let i = 0 ; i < concatBeforeMonth.length; i++){
            arrDays.unshift({ date: concatBeforeMonth[i], now: false});
        }

        //6 * 7 = 42개
        //앞에 더하고 42 - (더한값 ) = 를 다음달걸 붙히면 됌 
        let left = 42 - ( arrDays.length - 1 );
       // console.log(left);
        let concatAfterMonth;
        concatAfterMonth = this.getDaysArrayByMonthAfter(afterMonth, left);
        for(let i = 0 ; i < concatAfterMonth.length; i++){
            arrDays.push({ date : concatAfterMonth[i] , now: false});
        }

        let arr = []
        let dayArr = []
        let idx = 0;
        //7단위로 나누기 
        for(let i = 0; i < arrDays.length ; i++){
            if( i % 7  === 0  && i !== 0){
                dayArr.push(arr);
                idx +=1;
                arr = [];
            }else if (i === arrDays.length-1){
                dayArr.push(arr);
            }
            //console.log( this.isHoliday(arrDays[i].date) ? arrDays[i].concat({holiday : true}) : arrDays[i].concat({holiday : false}) ) 
            arr.push(arrDays[i]);
        }
       
        dayArr = dayArr.map((arr) => {
            console.log(arr)
            return (
             arr = arr.map((info) => {
                let holiday = this.isHoliday(info.date)
                if( holiday === 'Sunday'){
                    return (
                        { ...info, holiday : true , sunday : true, saturday : false } 
                    ) 
                }else if(holiday === 'Saturday'){
                    return(
                        { ...info, holiday : true , sunday : false, saturday : true }
                    )
                }else{
                    return(
                        { ...info, holiday : false, }
                    )
                }
             })
            )
        });
        console.log('fsdfdsfsdfdsf', dayArr)
        console.log(dayArr)
        this.monthArray = dayArr;
    }

    















}
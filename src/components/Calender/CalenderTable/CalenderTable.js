import React, { Component } from 'react'
import { Table, Input } from 'reactstrap';
import CalenderList from '../CalenderList';
import moment from 'moment'
import Popup from '../../Popup'
import { observer, inject, } from 'mobx-react'


class CalenderTable extends Component {
    state = {
        boardList : [],
        pageCount : 0,
        offset : 0,
        viewing : false,
        year : parseInt( moment().format('YYYY') ), // 현재 년도 
        month : parseInt( moment().format('M') ),
        day : ''
    }
    componentDidMount(){
     
    }
    //일단 두개로 분리 
    //이전
    getDaysArrayByMonthBefore = (month, left) => {
        let daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
        let count = daysInMonth - left
        let arrDays = [];
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

    //holiday 판별 
    isHoliday = (date) =>{

        //토요일, 일요일인 경우
        //console.log(date)
        let day = moment(date).format('dddd');
        console.log(day)
        if ( day === "Sunday" || day === "Saturday" ){
            console.log('isHoliday')
            return true;
        }
        else{
            return false;
        }
         
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

    getDaysArrayByMonth = () => {
        const {year , month} = this.state; 
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
        //현재 날짜 
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
        return dayArr;
    }



    handleDate = (e) =>{
        this.setState({
            day : e.target.value
        })
    }
    
    changeDate = (e) =>{
        const {year, month} = this.state;
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
        this.setState({
            year : nowYear,
            month :nowMonth
        })
    }

    render() {
        console.log('this.state.viewing ', this.state.viewing)
        const { boardList, viewing } = this.state;
        const { selectedArr, showPopup } = this.props;
        const monthArray = this.getDaysArrayByMonth();
        console.log(monthArray)
        const month = monthArray.map((item, idx) => { 
            console.log("item ", item)
            return (<CalenderList weekArray ={item}
                                  idx = {idx} 
                                />)
        })

        return (
            <div>
                {showPopup ?  <Popup/> :  null }
                <span>{this.state.year}년{this.state.month}월</span>
                <input placeholder ='YYYY-MM' 
                        onChange = {this.handleDate} 
                        value ={this.state.value}/>
                <Table responsive >
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>
                       {month}
                    </tbody>
                </Table>
                <button onClick = {this.changeDate} name ='before' >좌측</button>
                <button onClick = {this.changeDate} name= 'after' >우측</button>
            </div>
     )
  }
}

export default inject(({ calender }) => ({
    showPopup : calender.showPopup,
    month : calender.month,
    selectedArr : calender.selectedArr,
    setSelectedArr : calender.setSelectedArr,
  }))(observer( CalenderTable));
  
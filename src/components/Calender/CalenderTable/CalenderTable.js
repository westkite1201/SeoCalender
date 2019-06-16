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
        this.props.getDaysArrayByMonth();
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
        const { year, month, 
            selectedArr, showPopup, monthArray  } = this.props;
        console.log(monthArray)

        const monthList = monthArray.map((item, idx) => { 
            console.log("item ", item)
            return (<CalenderList weekArray ={item}
                                  idx = {idx} 
                                />)
        })

        return (
            <div>
                {showPopup ?  <Popup/> :  null }
                <span>{year}년{month}월</span>
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
                       {monthList}
                    </tbody>
                </Table>
                <button onClick = {this.changeDate} name ='before' >좌측</button>
                <button onClick = {this.changeDate} name= 'after' >우측</button>
            </div>
     )
  }
}

export default inject(({ calender }) => ({
    monthArray : calender.monthArray,
    showPopup : calender.showPopup,
    year : calender.year,
    month : calender.month,
    selectedArr : calender.selectedArr,
    setSelectedArr : calender.setSelectedArr,
    getDaysArrayByMonth : calender.getDaysArrayByMonth,
  }))(observer( CalenderTable));
  
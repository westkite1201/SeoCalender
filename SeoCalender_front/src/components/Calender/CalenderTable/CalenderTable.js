import React, { Component } from 'react'
import { Table, Input } from 'reactstrap';
import CalenderList from '../CalenderList';
import moment from 'moment'
import Popup from '../../Popup'
import { observer, inject, } from 'mobx-react'
import * as calenderApi from '../../../lib/api/calenderApi'

class CalenderTable extends Component {
    state = {
        boardList : [],
        pageCount : 0,
        offset : 0,
        viewing : false,
        year : parseInt( moment().format('YYYY') ), // 현재 년도 
        month : parseInt( moment().format('MM') ),
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

    getCalenderTodo = async() =>{
        const { year, month } = this.state;
        let dateStr = year + "-"+ month;
        let beforeDate =  moment(dateStr).subtract(1, 'months').format('YYYY-MM');
        let afterDate =   moment(dateStr).add(1, 'months').format('YYYY-MM');     
        let calenderArray = Array(Array(), Array());
        //let calenderArray = Array();
        try{ 
            const response = await calenderApi.getCalenderTodo( beforeDate, afterDate )
            //성공시 
            if( response.data.statusCode === 200 ){
                const calenderTodoData = response.data

                calenderTodoData.data.map((item)=>{
                    let calenderObject = {
                            todoNum : item.todo_num,
                            date : item.date,
                            title : item.title,
                            background: item.background,
                            description : item.description,
                    }
                    let formatDate = moment(item.date).format('YYYY-MM-DD')
                    if(!calenderArray[formatDate]){
                        calenderArray[formatDate] = [] 
                    }
                    if(!calenderArray[formatDate][item.todo_num]){
                        calenderArray[formatDate][item.todo_num] = calenderObject
                    }
                });
            }
            console.log("calenderArray", calenderArray)
        }catch(e){
            console.log(e)
        }
    
    }

    
    
    render() {
        const { 
            year, 
            month, 
            showPopup, 
            monthArray,
            changeDate } = this.props;
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
                <button onClick = {changeDate} name ='before' >좌측</button>
                <button onClick = {changeDate} name= 'after' >우측</button>
                <button onClick = {this.getCalenderTodo}  >테스트</button>
            </div>
     )
  }
}

export default inject(({ calender }) => ({
    monthArray : calender.monthArray,
    changeDate : calender.changeDate,
    showPopup : calender.showPopup,
    year : calender.year,
    month : calender.month,
    selectedArr : calender.selectedArr,
    setSelectedArr : calender.setSelectedArr,
    getDaysArrayByMonth : calender.getDaysArrayByMonth,
  }))(observer( CalenderTable));
  
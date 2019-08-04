import React, { Component, Fragment } from 'react'
import moment from 'moment'
import CalendarTodoModal from './CalenderTodoModal'
import './CalenderTest.scss';
import CalenderItem from './CalenderItem'
import { observer, inject, } from 'mobx-react'
import CalenderTodoModal from './CalenderTodoModal';
class CalenderTest extends Component {

    componentDidMount(){
      this.props.getCalenderTodo();
      console.log( this.props.todayDate )
    }
     generate = () => {
      const { todayDate } = this.props;
      const today = todayDate;
      const startWeek = today.clone().startOf('month').week();
      const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
      let calendar = [];
      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(
          <div className="row" key={week}>
            {
              Array(7).fill(0).map((n, i) => {
                let current = today.clone().week(week).startOf('week').add(n + i, 'day')
                let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
                let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
                return (
                  <div className={`box  ${isSelected} ${isGrayed}`} key={i}>
                    <CalenderItem nowDate = {current}/>
                  </div>
                )
              })
            }
          </div>
        )
      }
      return calendar;
    }
    
    render() {
      const { todayDate,
              changeMonth,
              showTodoModal } = this.props;
        return (
          <Fragment>
        
            <div className="Calendar">
            {

              showTodoModal ? 
              <CalenderTodoModal showTodoModal ={showTodoModal}/>
               : 
              null
            }
            <div className="head">
              <button name ='before' onClick = {changeMonth}>이전</button>
              <span className="title"> {todayDate.format('YYYY-MM')}</span>
              <button name ='after' onClick = {changeMonth}>다음</button>
            </div>
            <div className="body">
              <div className="row">
                <div className="box">
                  <span className="text">SUN</span>
                </div>
                <div className="box">
                  <span className="text">MON</span>
                </div>
                <div className="box">
                  <span className="text">TUE</span>
                </div>
                <div className="box">
                  <span className="text">WED</span>
                </div>
                <div className="box">
                  <span className="text">THU</span>
                </div>
                <div className="box">
                  <span className="text">FRI</span>
                </div>
                <div className="box">
                  <span className="text">SAT</span>
                </div>
              </div>
      
         
              {this.generate()}
           
            </div>
          </div>
          </Fragment>
        )
    }
}


export default inject(({ calender, popup }) => ({
  showTodoModal : popup.showTodoModal,
  todayDate  : calender.todayDate,
  changeMonth : calender.changeMonth,
  getCalenderTodo : calender.getCalenderTodo,
}))(observer( CalenderTest));
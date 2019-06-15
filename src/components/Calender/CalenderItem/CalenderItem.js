import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import style from './CalenderItem.module.css'
import Popup from '../../Popup'
import { observer, inject, } from 'mobx-react'
class CalenderItem extends Component {
    state = {
      select : false
    }
    selectedItem = (day) =>{
      const {setSelectedArr, selectedArr,togglePopup} = this.props; 
    // // setSelectedArr(selectedArr[day]);
    //   this.setState({
    //     select : !this.state.select
    //   },() =>  togglePopup())

      togglePopup();
    }
    render(){

        const { day, nowDate,index, holiday, saturday, sunday,showPopup,togglePopup } = this.props;
        console.log(nowDate, holiday)

        /* classNames 모듈 사용  */
        let tdClasses = classNames({
            [style.holiday] : holiday,
            [style.saturday] : saturday,
            [style.sunday] : sunday,
            [style.notpresentMonth] : !nowDate, 
            [style.selectedTr]: this.state.select }
        );

        return(
            <td //onClick ={() =>this.selectedItem(day) }
                onClick ={togglePopup}
                key = {day} 
                name = {day}
                className = { tdClasses }>
                <div style ={{height : '80px' , width : '200px'}}>
                  {day}   
                </div>
          
            </td>
        ) 
    }
}

export default inject(({ calender }) => ({
    togglePopup : calender.togglePopup,
    month : calender.month,
    selectedArr : calender.selectedArr,
    setSelectedArr : calender.setSelectedArr,
    showPopup : calender.showPopup
  }))(observer( CalenderItem));
import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import style from './CalenderItem.module.css'
import Popup from '../../Popup'
import { observer, inject, } from 'mobx-react'
import _ from 'lodash'
class CalenderItem extends Component {
    state = {
      select : false
    }
    selectedItem = (day) =>{
      const {setSelectedArr, selectedArr, togglePopup} = this.props; 
      togglePopup();
    }
    render(){

        const { date, 
          day, 
          nowDate,
          index, 
          holiday, 
          saturday, 
          sunday,
          showPopup,
          calenderObjectMap,
          togglePopup, } = this.props;
           
        //console.log(nowDate, holiday)
        //let day = moment(date).format('DD')
        /* classNames 모듈 사용  */
        let tdClasses = classNames({
            [style.holiday] : holiday,
            [style.saturday] : saturday,
            [style.sunday] : sunday,
            [style.notpresentMonth] : !nowDate, 
            [style.selectedTr]: this.state.select }
        );
        

        let blockList = [];
        if( !_.isNil( calenderObjectMap.get(date))){
          blockList = calenderObjectMap.get(date).map((item, key)=>{
            console.log(item.title)
            let style = {
              backgroundColor : item.background  ,
              width : '100%',
              height : '1rem',
              color : 'white',
              fontSize : '0.8rem'
            }
            return (
                <div style ={ style } key ={key} >
                  {item.title}
                </div>
            )
         })
       }


        return(
            <td //onClick ={() =>this.selectedItem(day) }
                onClick ={ () => togglePopup(day, date)}
                key = {day} 
                name = {day}
                className = { tdClasses }>
                <div style ={{ width : '200px'}}>
                  {day}   
                </div>
                <div>
                  {blockList}
                </div>

                  
          
            </td>
        ) 
    }
}

export default inject(({ calender, Popup }) => ({
    calenderObjectMap : calender.calenderObjectMap,
    calenderObjList : calender.calenderObjList,
    togglePopup : calender.togglePopup,
    month : calender.month,
    selectedArr : calender.selectedArr,
    setSelectedArr : calender.setSelectedArr,
    showPopup : calender.showPopup
  }))(observer( CalenderItem));
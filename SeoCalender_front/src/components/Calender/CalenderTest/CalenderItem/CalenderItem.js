import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import './CalenderItem.scss'
import Popup from '../../../Popup'
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

        const { 
          nowDate, //parent
          calenderObjectMap , // mobx
       } = this.props;
           
        let blockList = [];
        let formatDate =  moment(nowDate).format('YYYY-MM-DD')
    
      
        if( !_.isNil( calenderObjectMap.get(formatDate))){
          blockList = calenderObjectMap.get(formatDate).map((item, key)=>{
                if(!_.isNil(item)){
                  let style = {
                    backgroundColor : item.background  ,
                    width : '100%',
                    height : '1rem',
                    color : 'black',
                    fontSize : '0.8rem'
                  }
                  return (
                      <div style ={ style } key ={key} >
                        {item.title}
                      </div>
                  )
                }
         })
       }

       let day = nowDate.format('D');

        return(
          <div key = {day} >
              <span style ={{ width : '200px' }} classname ="text">
                {day}   
              </span>
            <div>
              {blockList}
            </div>
          </div>
        ) 
    }
}

export default inject(({ calender, popup }) => ({
  toggleCalenderTodoModal : popup.toggleCalenderTodoModal,
  calenderObjectMap : calender.calenderObjectMap
  }))(observer( CalenderItem));
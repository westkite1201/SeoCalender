import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'

import CalenderItem from '../CalenderItem'
import { observer, inject, } from 'mobx-react'

class CalenderList extends Component {
  render() {

   const {  postsNum,
            index,
            notMonth,
            yearMonth,
            weekArray,
            idx
        } = this.props;
      //console.log(weekArray)
      let list = weekArray.map((item, index) =>{
        //console.log(item.now)
        return ( <CalenderItem 
                              date = {item.date}
                              nowDate = {item.now}
                              holiday = {item.holiday}
                              sunday = {item.sunday}
                              saturday = {item.saturday}
                              day = {moment(item.date).format('DD')}
                              index = {index}/> )
      })
      //7개가 들어가 있어야함 
     return (
          <tr key = {idx}>
            {list}    
          </tr>
    )
  }
}

export default inject(({ calender }) => ({
  month : calender.month,
  selectedArr : calender.selectedArr,
  setSelectedArr : calender.setSelectedArr,
}))(observer( CalenderList));


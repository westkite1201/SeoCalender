import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import './CalenderItem.scss';
import Popup from '../../Popup';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';
class CalenderItem extends Component {
  state = {
    select: false
  };
  selectedItem = (day) => {
    const { setSelectedArr, selectedArr, togglePopup } = this.props;
    togglePopup();
  };
  render() {
    const {
      date, //moment 객체
      day,
      nowDate,
      index,
      holiday,
      saturday,
      sunday,
      showPopup,
      calenderObjectMap,
      calenderArray,
      togglePopup
    } = this.props;

    //console.log(nowDate, holiday)
    //let day = moment(date).format('DD')
    /* classNames 모듈 사용  */
    let tdClasses = classNames({
      table: true,
      holiday: holiday,
      saturday: saturday,
      sunday: sunday,
      notpresentMonth: !nowDate,
      selectedTr: this.state.select
    });

    let blockList = [];
    let formatDate = moment(date).format('YYYY-MM-DD');

    if (!_.isNil(calenderObjectMap.get(formatDate))) {
      blockList = calenderObjectMap.get(formatDate).map((item, key) => {
        if (!_.isNil(item)) {
          let style = {
            backgroundColor: item.background,
            width: '100%',
            height: '1rem',
            color: 'black',
            fontSize: '0.8rem'
          };
          return (
            <div style={style} key={key}>
              {item.title}
            </div>
          );
        }
      });
    }

    return (
      <td //onClick ={() =>this.selectedItem(day) }
        onClick={() => togglePopup(day, date)}
        key={day}
        name={day}
        className={tdClasses}
      >
        <div style={{ width: '100%' }}>{day}</div>
        <div>{blockList}</div>CalenderItem
      </td>
    );
  }
}

export default inject(({ calender, Popup }) => ({
  calenderArray: calender.calenderArray,
  calenderObjectMap: calender.calenderObjectMap,
  calenderObjList: calender.calenderObjList,
  togglePopup: calender.togglePopup,
  month: calender.month,
  selectedArr: calender.selectedArr,
  setSelectedArr: calender.setSelectedArr,
  showPopup: calender.showPopup
}))(observer(CalenderItem));

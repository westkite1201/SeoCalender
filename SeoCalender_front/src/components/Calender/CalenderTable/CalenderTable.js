import React, { Component } from 'react';
import CalenderList from '../CalenderList';
import moment from 'moment';
import Popup from '../../Popup';
import { observer, inject } from 'mobx-react';
import './CalenderTable.scss';
import * as calenderApi from '../../../lib/api/calenderApi';

class CalenderTable extends Component {
  state = {
    boardList: [],
    pageCount: 0,
    offset: 0,
    viewing: false,
    year: parseInt(moment().format('YYYY')), // 현재 년도
    month: parseInt(moment().format('MM')),
    day: ''
  };
  componentDidMount() {
    this.props.getDaysArrayByMonth();
    this.props.getCalenderTodo();
  }

  handleDate = (e) => {
    this.setState({
      day: e.target.value
    });
  };

  render() {
    const { year, month, showPopup, monthArray, changeDate } = this.props;
    console.log(monthArray);

    const monthList = monthArray.map((item, idx) => {
      console.log('item ', item);
      return <CalenderList weekArray={item} idx={idx} />;
    });

    return (
      <div>
        {showPopup ? <Popup /> : null}
        <span>
          {year}년{month}월
        </span>
        <input
          placeholder="YYYY-MM"
          onChange={this.handleDate}
          value={this.state.value}
        />
        <table className="table" style={{ width: '100%' }}>
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
          <tbody>{monthList}</tbody>
        </table>
        <button onClick={changeDate} name="before">
          좌측
        </button>
        <button onClick={changeDate} name="after">
          우측
        </button>
        <button onClick={this.getCalenderTodo}>테스트</button>
      </div>
    );
  }
}

export default inject(({ calender }) => ({
  getCalenderTodo: calender.getCalenderTodo,
  monthArray: calender.monthArray,
  changeDate: calender.changeDate,
  showPopup: calender.showPopup,
  year: calender.year,
  month: calender.month,
  selectedArr: calender.selectedArr,
  setSelectedArr: calender.setSelectedArr,
  getDaysArrayByMonth: calender.getDaysArrayByMonth
}))(observer(CalenderTable));

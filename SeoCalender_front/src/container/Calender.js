import React, { useEffect, useState } from 'react';
import CalenderItem from '../components/Calender_/CalenderItem';
import './Calender.scss';
import moment from 'moment';
const Calender = () => {
  const [monthlyList, setMonthlyList] = useState();
  const [today, setToday] = useState(moment());

  const changeMonth = (e) => {
    let todayDate;
    if (e.target.name === 'before') {
      todayDate = moment(today).subtract(1, 'months');
    } else if (e.target.name === 'after') {
      todayDate = moment(today).add(1, 'months');
    }
    setToday(todayDate);
  };

  useEffect(() => {
    const generate = () => {
      const startWeek = today.clone().startOf('month').week();
      const endWeek =
        today.clone().endOf('month').week() === 1
          ? 53
          : today.clone().endOf('month').week();
      let calendar = [];
      for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(
          <tr className="row" key={week}>
            {Array(7)
              .fill(0)
              .map((n, i) => {
                let current = today
                  .clone()
                  .week(week)
                  .startOf('week')
                  .add(n + i, 'day');
                let isSelected =
                  today.format('YYYYMMDD') === current.format('YYYYMMDD')
                    ? 'selected'
                    : '';
                let isGrayed =
                  current.format('MM') === today.format('MM') ? '' : 'grayed';
                return (
                  <CalenderItem
                    isSelected={isSelected}
                    isGrayed={isGrayed}
                    nowDate={current}
                    key={current.format('YYYYMMDD')}
                  />
                );
              })}
          </tr>
        );
      }
      return calendar;
    };
    let monthlyList = generate();
    setMonthlyList(monthlyList);
  }, [today]);

  console.log(monthlyList);
  return (
    <div>
      <div className="head">
        <button name="before" onClick={changeMonth}>
          이전
        </button>
        <span className="title"> {today.format('YYYY-MM')}</span>
        <button name="after" onClick={changeMonth}>
          다음
        </button>
      </div>
      <table className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ color: 'red' }}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th style={{ color: '#588dff' }}>토</th>
          </tr>
        </thead>
        <tbody>{monthlyList && monthlyList}</tbody>
      </table>
    </div>
  );
};

export default Calender;

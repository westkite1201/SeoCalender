import React from 'react';
import moment from 'moment';
const CalenderItem = (props) => {
  const { nowDate, isSelected, isGrayed } = props;
  console.log(nowDate);
  return (
    <td className={`box ${isSelected} ${isGrayed}`}>
      <div style={{ width: '100%' }}></div>
      <div>{moment(nowDate).format('DD')}</div>
    </td>
  );
};
export default CalenderItem;

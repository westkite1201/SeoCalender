import React, { Component } from 'react'
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames'
import './Popup.scss'
import { TwitterPicker } from 'react-color';
import { observer, inject, } from 'mobx-react'
import { width } from '@material-ui/system';

class Popup extends Component {
  state = {
    toggle : false,
    background :  '#B80000' // default color 
  }
    
  toggleColorPicker = () =>{
      this.setState({
        toggle : !this.state.toggle
      })
  }
  handleChangeComplete = (color) => {
      this.setState({ background: color.hex });
  }

    render() {
      const { 
              day, 
              currentSelectYear,
              currentSelectMonth
            }  = this.props;

      let style = {
        backgroundColor : this.state.background  ,
        width : '100%',
        height : '50px',
      };
      let colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
      let date = currentSelectYear + "년 " + currentSelectMonth + "월 "+ day+ "일"
      return (
          <div className='popup'>
            <div className='popup_inner'>
              <div className = 'display_date'>
                  {date}
              </div>
              <div className = 'color_block' 
                   onClick = {this.toggleColorPicker} 
                   style ={ style} >
                BLOCK 색상 
              </div>
              {
                this.state.toggle ? 
                (  
                  <TwitterPicker colors = {colors} 
                               color={ this.state.background }
                               onChange={ this.handleChangeComplete }
                               />
                ) : 
                (
                   null 
                ) 
              } 
              <TextField
                id="standard-with-placeholder"
                label="일정"
                placeholder="일정"
                //className={classes.textField}
                margin="normal"
              />
             


              <button onClick={() => this.props.closePopup()}>취소</button>
            </div>
          </div>
        );
    }
}

export default inject(({ calender }) => ({
    currentSelectYear : calender.currentSelectYear,
    currentSelectMonth : calender.currentSelectMonth,
    year : calender.year,
    month : calender.month,
    day : calender.day,
    closePopup: calender.closePopup,
    showPopup : calender.showPopup
}))(observer( Popup));


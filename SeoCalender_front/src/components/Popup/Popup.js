import React, { Component } from 'react'
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames'
import './Popup.scss'
import { TwitterPicker } from 'react-color';
import { observer, inject, } from 'mobx-react'
import _ from 'lodash'
import { width, textAlign } from '@material-ui/system';

class Popup extends Component {
  state = {
    toggle : false
  }
    
  toggleColorPicker = () =>{
      this.setState({
        toggle : !this.state.toggle
      })
  }
  handleChangeComplete = (color) => {
      const { setBackgroundColor } =this.props;
      this.setState({ background: color.hex });
      setBackgroundColor(color);
  }
  handleTitle = (e) => {
    const { changeTitle } = this.props;
    changeTitle(e.target.value); 
  }
  handleEditTitle = (e) => {
    const { chagneeEditTitle } = this.props;
    chagneeEditTitle(e.target.value); 
  }



  componentDidMount(){
    //this.props 
  }

    render() {
      
      const { 
              background,
              currentDate,
              day, 
              calenderObject,
              currentSelectYear,
              currentSelectMonth,
              calenderObjectMap,
              removeSelectBlock,
              modifySelectBlock,
              editMode,
              editTitle,
              changeEditTitle
            }  = this.props;
            
      console.log("currentDate ", currentDate)
      let style = {
        backgroundColor : background  ,
        width : '100%',
        height : '50px',
      };
      let colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
      let dateStr = currentSelectYear + "년 " + currentSelectMonth + "월 "+ day+ "일"
      
      let blockList = [];
      if( !_.isNil( calenderObjectMap.get(currentDate))){
        blockList = calenderObjectMap.get(currentDate).map((item, key)=>{
          console.log(item.title)
          let style = {
            backgroundColor : item.background  ,
            width : '50%',
            height : '50px',
            borderRadius: '10px',
            textAlign : 'center',
            color :'white',
            padding : '10px',
            margin : '5px'
          }
          return (
              <div style ={ style } key ={key} >
                {
                  editMode ?
                  ( <input value={editTitle} onChange={changeEditTitle}/> ) :       
                  (item.title)
                }
              <div>
              {
                editMode ?
                <button onClick = {() => modifySelectBlock()}> 취소 </button>
                  :
                <button onClick = {() => modifySelectBlock(key, currentDate)}> 수정 </button> 
              }
                  
                    <button onClick = {() => removeSelectBlock(key, currentDate)}> 삭제  </button>
                  </div>
              </div>
          )
       })
     }
      
      
      
      return (
          <div className='popup'>
            <div className='popup_inner'>
              <div className = 'display_date'>
                  {dateStr}
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
                                color={ background }
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
                onChange = {this.handleTitle}
                value = {calenderObject.title} 
                //className={classes.textField}
                margin="normal"
              />
              <div>
                {blockList}
              </div>

              <button onClick={() => this.props.concatCalendar(currentDate)}>추가</button>
              <button onClick={() => this.props.closePopup()}>취소</button>
            </div>
          </div>
        );
    }
}

export default inject(({ calender }) => ({
  removeSelectBlock : calender.removeSelectBlock,
  modifySelectBlock : calender.modifySelectBlock,
  changeEditTitle : calender.changeEditTitle,
  editTitle : calender.editTitle,
   setBackgroundColor: calender.setBackgroundColor,
    calenderObjectMap : calender.calenderObjectMap,
    calenderObject : calender.calenderObject,
    changeTitle : calender.changeTitle,
    concatCalendar : calender.concatCalendar,
    currentDate  :calender.currentDate,
    currentSelectYear : calender.currentSelectYear,
    currentSelectMonth : calender.currentSelectMonth,
    editMode : calender.editMode,
    year : calender.year,
    month : calender.month,
    day : calender.day,
    closePopup: calender.closePopup,
    showPopup : calender.showPopup,
    background :calender.background,
}))(observer( Popup));


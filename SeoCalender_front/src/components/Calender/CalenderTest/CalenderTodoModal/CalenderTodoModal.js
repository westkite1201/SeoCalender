import React, { Component, Fragment } from "react";
import './CalenderTodoModal.scss'
import { withStyles } from '@material-ui/core/styles';
import { TimelineLite, CSSPlugin } from "gsap/all";
import { observer, inject, } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import _ from 'lodash'
import moment from 'moment'
import { TwitterPicker } from 'react-color';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '95%',
    },
    dense: {

      marginTop: 19,
    },
    menu: {
      width: 200,
    },

  });
  
@inject("popup")
@inject("calender")
@observer
class CalenderTodoModal extends Component {
  constructor(props) {
    super(props);

    this.modalWrap = null;
    this.modalDialog = null;
    this.modalTween = new TimelineLite({ paused: true });
  }

  keyDownHandler = e => {
    console.log("keyDownHandler")
    const { popup } =this.props;
    //esc
    if (e.keyCode === 27){
      popup.toggleCalenderTodoModal();
    }
  };

  componentDidMount() {
    const { popup }  =this.props;
    console.log("componentDidOMunt") 
    window.addEventListener("keydown", this.keyDownHandler);
    // this.modalTween
    //   .to(this.modalWrap, 0.01, { autoAlpha: 1 })
    //   .to(this.modalDialog, 0.25, { y: 50, autoAlpha: 1 }, 0)
    //   .reversed(true)
    //   .paused(false);
  }

  componentDidUpdate() {
    //const { popup }  =this.props;
    // console.log(popup.showTodoModal)
    // this.modalTween.reversed(!this.props.showTodoModal);
  }
  componentWillUnmount(){
    const { popup } =this.props;
    console.log("componentWillUnmount") 
    window.removeEventListener("keydown", this.keyDownHandler);
    popup.initCalenderObeject();

  }

  render() {
    const {
      popup,
      calender
    } = this.props;
    let style = {
      backgroundColor : popup.calenderTodoObject.background  ,
      width : '100%',
      height : '50px',
    };
    let colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
  
    let blockList = [];
    let formatDate =  moment(popup.selectPopupDate).format('YYYY-MM-DD')
    if( !_.isNil( calender.calenderObjectMap.get(formatDate))){
      blockList = calender.calenderObjectMap.get(formatDate).map((item, key)=>{
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
    return (
      <div
        className="todo_popup"
        ref={div => (this.modalWrap = div)}
        // onClick={comment.handleModalVisible}
      >
        <div
          className="todo_popup_inner"
          ref={div => (this.modalDialog = div)}
          onClick={event => event.stopPropagation()}
        >
          <div className="todo_popup_content">
            <div className="todo_popup_header">

              <div className = 'display_date'>
                  {popup.selectPopupDate.format('YYYY-MM-DD')}
              </div>

              <div className = 'color_block' 
                   onClick = {popup.toggleColorPicker} 
                   style ={ style} >
                BLOCK 색상 
              </div>
              {
                popup.showColorPicker ? 
                (  
                  <TwitterPicker colors = {colors} 
                                color={ popup.calenderTodoObject.background }
                                onChange={popup.setBackgroundColor }
                               />
                ) : 
                (
                   null 
                ) 
              } 
            </div>

            <div className="modal-body">
              <div>
                {blockList}
              </div>
              <div>
                <TextField
                  id="standard-name"
                  label="제목"
                  className={styles.textField}
                  value={popup.calenderTodoObject.title}
                  onChange={popup.onChangeTitle}
                  margin="normal"
              />
              </div>
              <div>
                  <TextField
                    id="standard-multiline-static"
                    label="내용"
                    multiline
                    rows="4"
                    defaultValue = {popup.calenderTodoObject.description}
                    className={styles.textField}
                    onChange={popup.onChangeDescription}
                    margin="normal"
                    variant="filled"
                  />
              </div>

              <div className ="buttonContainer">
                <Button variant="contained" 
                        color="primary" 
                        className={styles.button}
                        onClick ={() => popup.concatCalendar()}
                        >
                  추가
                </Button>

                <Button variant="contained" 
                        color="primary" 
                        className={styles.button}
                        onClick = {() => popup.toggleCalenderTodoModal() } >
                  취소
                </Button>
              </div>

            </div>

            <div className="modal-footer">
            </div>

          </div>
        </div>

        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover/>
      </div>
    );
  }
}

export default withStyles(styles)(CalenderTodoModal);
import React, { Component, Fragment } from "react";
import './CalenderTodoModal.scss'
import { withStyles } from '@material-ui/core/styles';
import { TimelineLite, CSSPlugin } from "gsap/all";
import { observer, inject, } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TwitterPicker } from 'react-color';
const styles = theme => ({
    // container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    // },
    // textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    //   width: '95%',
    // },
    // dense: {

    //   marginTop: 19,
    // },
    // menu: {
    //   width: 200,
    // },

  });
  
@inject("popup")
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
    console.log("componentWillUnmount") 
    window.removeEventListener("keydown", this.keyDownHandler);
  }

  render() {
    const {
      popup
    } = this.props;
    let style = {
      backgroundColor : popup.background  ,
      width : '100%',
      height : '50px',
    };
    let colors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB']
  
  
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
                  {popup.selectPopupDate.format('YYYY-MM')}
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
                                color={ popup.background }
                                onChange={ popup.setBackgroundColor }
                               />
                ) : 
                (
                   null 
                ) 
              } 
            </div>

            <div className="modal-body">
            <p>Animates a modal in and out by changing the state of the component.</p>
						<p>In this sample the modal animation is controlled by changing the state of the main component, then this state is passed as a prop to the modal component. The in/out animation of the modal depends on the value of this prop passed to it.</p>
						<p>A close method is also passed to the modal component as a prop, in order to hide the modal using a close button inside the modal component.</p>
            </div>

            <div className="modal-footer">
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalenderTodoModal);
import React, { Component } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import './Popup.scss'

import { observer, inject, } from 'mobx-react'

class Popup extends Component {
    render() {

        return (
          <div className='popup'>
            <div className='popup_inner'>
              <h1>테스트 메세지 입니다. </h1>
            <button onClick={() => this.props.closePopup()}>close me</button>
            </div>
          </div>
        );
    }
}

export default inject(({ calender }) => ({
    closePopup: calender.closePopup,
    showPopup : calender.showPopup
}))(observer( Popup));


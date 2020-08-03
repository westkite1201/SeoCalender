import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import './Navigation.scss';

@observer
class Navigation extends Component {
  componentDidMount = async () => {
    const { initServiceWorker } = this.props;
    initServiceWorker();
  };
  render() {
    const { isSubscribed, unsubscribe, subscribeAndPushSend } = this.props;

    console.log('isSubscribed', isSubscribed);
    return (
      <div className="wrapperRoot">
        {isSubscribed ? (
          <NotificationsActiveIcon onClick={unsubscribe} />
        ) : (
          <NotificationsOffIcon onClick={subscribeAndPushSend} />
        )}
        <div onClick={subscribeAndPushSend}>pushTest</div>
        <div onClick={unsubscribe}>unsubscribe</div>
      </div>
    );
  }
}

export default inject(({ webpush }) => ({
  isSubscribed: webpush.isSubscribed,
  lodingSubscribe: webpush.lodingSubscribe,

  initServiceWorker: webpush.initServiceWorker,
  subscribeAndPushSend: webpush.subscribeAndPushSend,
  unsubscribe: webpush.unsubscribe
}))(observer(Navigation));

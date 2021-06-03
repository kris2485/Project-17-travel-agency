import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';
import { formatTime } from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  constructor() {
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const { title, promoDescription } = this.props;
    const countDownTime = this.getCountdownTime();
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{countDownTime > 23 * 60 * 60 ? promoDescription : formatTime(countDownTime)}</div>
      </div>
    );
  }
  getCountdownTime() {
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if (currentTime.getUTCHours() >= 12) {
      nextNoon.setUTCDate(currentTime.getUTCDate() + 1);
    }

    return Math.round((nextNoon.getTime() - currentTime.getTime()) / 1000);
  }
}
HappyHourAd.propTypes = {
  title: PropTypes.string,
  promoDescription: PropTypes.node,
};

export default HappyHourAd;

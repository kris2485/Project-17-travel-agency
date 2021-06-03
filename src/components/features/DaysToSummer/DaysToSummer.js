import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  render() {
    const countDownDate = this.getCountDownDate();
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{countDownDate}</h3>
      </div>
    );
  }
  getCountDownDate() {
    const currentDate = new Date();
    const startSummer = new Date(Date.UTC(currentDate.getFullYear(), 5, 21));

    if (currentDate.getUTCMonth() == 8 || currentDate.getUTCDate() > 23) {
      startSummer.setUTCFullYear(startSummer.getUTCFullYear() + 1);
    }
    const one_day = 1000 * 60 * 60 * 24;
    let daysToSummer = Math.round((startSummer.getTime() - currentDate.getTime()) / one_day);
    console.log(daysToSummer);
    if (daysToSummer == 1) {
      return '1 day to Summer!';
    } else if (daysToSummer <= 0) {
      return '';
    } else {
      return daysToSummer + ' days to Summer!';
    }
  }
}

export default DaysToSummer;

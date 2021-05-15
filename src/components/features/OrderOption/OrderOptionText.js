import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

const OrderOptionText = ({ currentValue, setOptionValue }) => (
  <div>
    <input className={styles.input} type='text' value={currentValue} onChange={(event) => setOptionValue(event.currentTarget.value)} />
  </div>
);
OrderOptionText.propTypes = {
  currentValue: PropTypes.any,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;

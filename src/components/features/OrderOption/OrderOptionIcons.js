import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import styles from './OrderOption.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({ values, required, currentValue, setOptionValue }) => (
  <div className={styles.icon}>
    {!required ? (
      ''
    ) : (
      <div value='' onClick={() => setOptionValue('')}>
        <Icon name={'times-circle'} />
      </div>
    )}
    {values.map((value) => (
      <div className={value.id == currentValue ? styles.iconActive : styles.icon} key={value.id} onClick={(event) => setOptionValue(event.currentTarget.value.id)}>
        <Icon name={value.icon} />
        {value.name} ({formatPrice(value.price)})
      </div>
    ))}
  </div>
);

export default OrderOptionIcons;

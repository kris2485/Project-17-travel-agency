import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripId, tripCountry, tripName) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    tripCountry,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  if (options.name === '' || options.contact === '') {
    alert('Please fill in your contact data');
  } else {
    fetch(url, fetchOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }
};

const OrderForm = ({ tripCost, options, setOrderOption, tripId, tripCountry, tripName }) => (
  <Row className={styles.box}>
    {pricing.map((option) => (
      <Col md={4} key={option.id}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
        <Button onClick={() => sendOrder(options, tripCost, tripId, tripCountry, tripName)}>Order now!</Button>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} />
    </Col>
  </Row>
);
OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.any,
  tripId: PropTypes.string,
  tripCountry: PropTypes.any,
  tripName: PropTypes.string,
};

export default OrderForm;

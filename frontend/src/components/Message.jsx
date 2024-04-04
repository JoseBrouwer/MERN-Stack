import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
};

Message.defaultProps = {
    variant: 'info',
};

Message.propTypes = {
  children: PropTypes.node,
};

export default Message;
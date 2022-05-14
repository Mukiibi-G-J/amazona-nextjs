import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import useStyles from '../utils/styles';

export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  const mylist = ['Login', 'Shipping Address', 'Payment Method', 'Place Order'];
  return (
    <Stepper
      activeStep={activeStep}
      className={classes.progresbar}
      alternativeLabel
    >
      {mylist.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

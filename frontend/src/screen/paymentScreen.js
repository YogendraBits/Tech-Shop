import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/formContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="mb-4">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            ></Form.Check>
            <Form.Check
              type='radio'
              label='UPI (Unified Payments Interface)'
              id='UPI'
              name='paymentMethod'
              value='UPI'
              checked={paymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Cash on Delivery'
              id='Cash'
              name='paymentMethod'
              value='Cash'
              checked={paymentMethod === 'Cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-3"
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className="w-100">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
        <Button onClick={() => history.push('/')}  variant="light" className="mb-3">
        <i className="fas fa-arrow-left mr-2"></i> Home
      </Button>
        <h1><span style={{ fontSize: '20px'}}>Order Id: {order._id}</span></h1>
          
      <Row>
      <Col md={8} style={{ marginBottom: '20px' }}>
  <ListGroup variant='flush'>
    <ListGroup.Item style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid #dee2e6' }}>Shipping</h2>
      <p>
        <strong>Name: </strong> {order.user.name}
      </p>
      <p>
        <strong>Email: </strong>{' '}
        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
      </p>
      <p>
        <strong>Address:</strong>
        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
        {order.shippingAddress.postalCode},{' '}
        {order.shippingAddress.country}
      </p>
      {order.isDelivered ? (
        <Message variant='success'>
          Delivered on {order.deliveredAt}
        </Message>
      ) : (
        <Message variant='danger' style={{ backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>Not Delivered</Message>
      )}
    </ListGroup.Item>

    <ListGroup.Item style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid #dee2e6' }}>Payment Method</h2>
      <p>
        <strong>Method: </strong>
        {order.paymentMethod}
      </p>
      {order.isPaid ? (
        <Message variant='success'>Paid on {order.paidAt}</Message>
      ) : (
        <Message variant='danger' style={{ backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' }}>Not Paid</Message>
      )}
    </ListGroup.Item>

    <ListGroup.Item style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid #dee2e6' }}>Order Items</h2>
      {order.orderItems.length === 0 ? (
        <Message>Order is empty</Message>
      ) : (
        <ListGroup variant='flush'>
          {order.orderItems.map((item, index) => (
            <ListGroup.Item key={index} style={{ padding: '10px', borderBottom: '1px solid #dee2e6' }}>
              <Row>
                <Col md={1}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>
                </Col>
                <Col md={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </ListGroup.Item>
  </ListGroup>
</Col>

            
            
<Col md={4}>
  <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <ListGroup variant='flush'>
      <ListGroup.Item style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
        <h2>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
        <Row>
          <Col>Items</Col>
          <Col>${order.itemsPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
        <Row>
          <Col>Shipping</Col>
          <Col>${order.shippingPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
        <Row>
          <Col>Tax</Col>
          <Col>${order.taxPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
        <Row>
          <Col>Total</Col>
          <Col>${order.totalPrice}</Col>
        </Row>
                  </ListGroup.Item>
                  
      {!order.isPaid && (
        <ListGroup.Item>
          {loadingPay && <Loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={order.totalPrice}
              onSuccess={successPaymentHandler}
            />
          )}
        </ListGroup.Item>
                  )}
                  
      {loadingDeliver && <Loader />}
      {userInfo &&
        userInfo.isAdmin &&
        order.isPaid &&
        !order.isDelivered && (
          
                    <ListGroup.Item>
            <Button
              type='button'
              className='btn btn-block'
              onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
          </ListGroup.Item>
        )}
                </ListGroup>
                
  </Card>
</Col>

            
            
      </Row>
    </>
  )
}

export default OrderScreen
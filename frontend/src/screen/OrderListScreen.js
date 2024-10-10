import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listOrders } from '../actions/orderActions';
import './OrderListScreen.css';

const OrderListScreen = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Filter orders without excluding those with missing user data
  const filteredOrders = orders
    ? orders.filter((order) => 
        !order.user || order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortCriteria === 'total') {
      return b.totalPrice - a.totalPrice;
    } else if (sortCriteria === 'paid') {
      return a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1;
    } else if (sortCriteria === 'delivered') {
      return a.isDelivered === b.isDelivered ? 0 : a.isDelivered ? -1 : 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="order-list-container">
      <Link to="/" className="btn btn-light my-3" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Home
      </Link>
      <h1>Orders</h1>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by user name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={6}>
          <Form.Control as="select" value={sortCriteria} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="total">Total</option>
            <option value="paid">Paid</option>
            <option value="delivered">Delivered</option>
          </Form.Control>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table responsive className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : 'Deleted User'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/order/${order._id}`} className="btn btn-info btn-sm">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;

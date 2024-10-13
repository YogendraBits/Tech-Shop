import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listOrders } from '../actions/orderActions';
import './OrderListScreen.css';

const OrderListScreen = () => {
  const { pageNumber = 1 } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders(pageNumber));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, pageNumber]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Filter orders by user name or order ID
  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const userNameMatches = order.user && order.user.name.toLowerCase().includes(lowerCaseSearchTerm);
    const idMatches = order._id.toLowerCase().includes(lowerCaseSearchTerm);
    return userNameMatches || idMatches;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortCriteria === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortCriteria === 'total') return b.totalPrice - a.totalPrice;
    if (sortCriteria === 'paid') return a.isPaid === b.isPaid ? 0 : a.isPaid ? -1 : 1;
    if (sortCriteria === 'delivered') return a.isDelivered === b.isDelivered ? 0 : a.isDelivered ? -1 : 1;
    return 0;
  });

  const renderPagination = () => {
    const pageLimit = 6; // Number of page links to display
    const startPage = Math.max(1, page - Math.floor(pageLimit / 2));
    const endPage = Math.min(pages, startPage + pageLimit - 1);

    const hasPrev = page > 1;
    const hasNext = page < pages;

    return (
      <Pagination className="pagination justify-content-center my-4">
        {hasPrev && (
          <Pagination.Prev onClick={() => navigate(`/admin/orderlist/${page - 1}`)} />
        )}
        {startPage > 1 && (
          <>
            <Pagination.Item onClick={() => navigate(`/admin/orderlist/1`)}>1</Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis />}
          </>
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageIndex = startPage + index;
          return (
            <Pagination.Item
              key={pageIndex}
              active={pageIndex === page}
              onClick={() => navigate(`/admin/orderlist/${pageIndex}`)}
            >
              {pageIndex}
            </Pagination.Item>
          );
        })}
        {endPage < pages && (
          <>
            {endPage < pages - 1 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => navigate(`/admin/orderlist/${pages}`)}>{pages}</Pagination.Item>
          </>
        )}
        {hasNext && (
          <Pagination.Next onClick={() => navigate(`/admin/orderlist/${page + 1}`)} />
        )}
      </Pagination>
    );
  };

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
            placeholder="Search by user name or order ID"
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
        <>
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
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default OrderListScreen;

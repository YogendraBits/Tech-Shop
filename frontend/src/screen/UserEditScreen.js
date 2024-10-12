import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import './UserEditScreen.css'; // Include your CSS

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  const handleToggle = () => setIsAdmin((prev) => !prev);

  return (
    <div className="user-edit-container">
      <Link to="/admin/userlist" className="back-button">
        <i className="fas fa-arrow-left"></i> Back to Users
      </Link>
      <Card className="edit-card">
        <Card.Header className="text-center">
          <h2>Edit User</h2>
        </Card.Header>
        <Card.Body>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <div className="center-spinner">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-4">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </Form.Group>

              {/* Knob Switch */}
              <div className={`knob-container ${isAdmin ? 'active' : ''}`} onClick={handleToggle}>
                <div className="knob">
                  <i className={`fas ${isAdmin ? 'fa-check' : 'fa-times'}`}></i>
                </div>
                <span className="status-text">
                  {isAdmin ? 'Admin Access Granted' : 'No Admin Access'}
                </span>
              </div>


              <Button type="submit" variant="primary" className="submit-button mt-4">
                Save Changes
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserEditScreen;

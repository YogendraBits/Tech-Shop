import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import './UserListScreen.css'; 
import { Link } from 'react-router-dom';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteHandler = () => {
    if (userIdToDelete) {
      dispatch(deleteUser(userIdToDelete));
      setUserIdToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <div className="user-list-container">
      <Link to="/" className="btn btn-light my-3" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Home
      </Link>
      <h1 className="user-list-heading">Manage Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="user-tiles">
          {users.map((user) => (
            <div key={user._id} className="user-tile">
              <div className="user-info">
                <h2 className="user-name">{user.name}</h2>
                <p className="user-email">{user.email}</p>
                <p className="user-role">
                  {user.isAdmin ? 'Admin' : 'User'}
                </p>
              </div>
              <div className="user-actions">
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant='light' className='btn-edit'>
                    <i className='fas fa-edit'></i> Edit
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-delete'
                  onClick={() => handleDeleteClick(user._id)}
                >
                  <i className='fas fa-trash'></i> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Once the user is deleted, it cannot be re-stored. Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserListScreen;

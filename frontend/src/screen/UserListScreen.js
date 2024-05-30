import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import './UserListScreen.css'; // Import custom CSS for styling

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="user-list-container">
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
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className='fas fa-trash'></i> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListScreen;

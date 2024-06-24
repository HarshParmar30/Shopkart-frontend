import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">ShopKart</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300 text-gray-400">
              Explore Shop
            </Link>
            <Link to="/cart" className="hover:text-gray-300 text-gray-400">
              Your Bag
            </Link>
            <Link to="/orders" className="hover:text-gray-300 text-gray-400">
              Orders
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="flex items-center space-x-2">
              <Avatar src={user.avatar || '/broken-image.jpg'} />
              <span className="hover:text-gray-300">{user.username}</span>
            </button>
          ) : (
            <Link to="/login" className="hover:text-gray-300 text-gray-400">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

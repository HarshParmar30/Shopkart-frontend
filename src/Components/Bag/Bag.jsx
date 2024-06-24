import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, updateCartQuantity } from '../../Actions/Cart'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loading'; // Importing loading component

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart); // Accessing cart state from Redux store
  const { isAuthenticated } = useSelector((state) => state.user); // Accessing user state from Redux store
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart()); // Fetching cart items if user is authenticated
    }
  }, [dispatch, isAuthenticated]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Calculating total price of items in the cart
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatching action to remove item from cart
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartQuantity(productId, quantity)); // Dispatching action to update item quantity in cart
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigating to checkout page
  };

  return (
    <div className=" bg-gray-500 py-6"> {/* Dark background */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Items in Bag </h1> {/* Page title */}
        {loading ? (
          <Loading /> // Showing loading component if data is being fetched
        ) : error ? (
          <div className="text-center text-red-500">{error}</div> // Showing error message if there's an error
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">No items in cart</div> // Showing message if cart is empty
        ) : (
          <div className="grid grid-cols-1  gap-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md rounded-lg overflow-hidden"> {/* Dark, transparent, blurred card */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h2 className="text-lg font-semibold text-white">{item.title}</h2> {/* Item title */}
                      <p className="text-sm text-gray-400">Price: ${item.price.toFixed(2)}</p> {/* Item price */}
                      <div className="flex items-center mt-2">
                        <label htmlFor={`quantity-${item.productId}`} className="text-sm text-gray-400 mr-2">Quantity:</label>
                        <input
                          type="number"
                          id={`quantity-${item.productId}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))} // Handling quantity change
                          className="border border-gray-600 rounded-md w-16 text-center bg-gray-700 text-white"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="text-lg font-bold text-white">${(item.price * item.quantity).toFixed(2)}</p> {/* Total price for item */}
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Remove {/* Button to remove item from cart */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-8 flex justify-end">
            <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md rounded-lg p-4 w-full md:w-96"> {/* Dark, transparent, blurred total price card */}
              <h2 className="text-xl font-semibold text-white mb-4">Amount to pay: ${calculateTotalPrice().toFixed(2)}</h2> {/* Total price */}
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-900 bg-opacity-80 backdrop-filter backdrop-blur-md text-white font-bold py-2 rounded-md hover:bg-blue-500 transition duration-300"
              >
                Proceed to Checkout {/* Button to proceed to checkout */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

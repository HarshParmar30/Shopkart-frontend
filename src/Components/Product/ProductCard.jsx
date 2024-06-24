import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-fill object-center" />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white mb-2">{product.title}</h2>
        <p className="text-gray-300">${product.price}</p>
        <p className="text-gray-300">{product.color}</p>
        <Link
          to={`/products/${product._id}`}
          className="block mt-3 bg-blue-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-sm text-sm text-center"
        >
          Show Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

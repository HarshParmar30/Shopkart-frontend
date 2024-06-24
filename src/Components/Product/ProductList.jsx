import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../Actions/Product'; // Adjust the path as per your file structure
import ProductCard from './ProductCard'; // Import ProductCard component (assuming it exists)
import Loading from '../Loader/Loading'; // Import Loading component (assuming it exists)

// **Product Page Component**
const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // **Fetch Products on Mount**
  useEffect(() => {
    dispatch(getProducts()); // Dispatch action to fetch products on component mount
  }, [dispatch]);

  // **Handle Loading State**
  if (loading) {
    return <Loading />; // Show loading spinner while fetching data
  }

  // **Handle Error State**
  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Handle error state with red text for better visibility
  }

  // **Render Products** (assuming ProductCard component renders individual product details)
  return (
    <div className="bg-gray-500 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title (optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

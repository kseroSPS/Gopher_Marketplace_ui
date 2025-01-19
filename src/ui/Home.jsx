import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import useCurrentUser from './CurrentUser';

const Home = () => {
  const [products, setProducts] = useState([]);
  const currentUser = useCurrentUser();
  const location = useLocation();
  const token = '8bd1bd7bb60785f12f1cadb8681d37a09d8bc713'; 

  // Fetch products from API
  useEffect(() => {
    axios.get('http://localhost:8000/api/products/',{
      headers: {
        'Authorization': `Token ${token}`,
      },
       
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Add the new product from the navigation state
  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prevProducts) => [...prevProducts, location.state.newProduct]);
    }
  }, [location.state]);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>All Products</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product}  currentUser = {currentUser}/>
        ))}
      </div>
    </div>
  );
};

export default Home;

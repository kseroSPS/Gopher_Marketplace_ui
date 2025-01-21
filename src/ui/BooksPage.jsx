import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
// import useCurrentUser from './CurrentUser';
const BooksPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const currentUser = JSON.parse(sessionStorage.getItem("User"));
  const token = currentUser.auth_token;
  console.log("Hello",token);
  

  // Fetch products from API
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/api/products/', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => {
          const books = response.data.filter((product) => product.category === "BOOKS");
          setProducts(books);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [token]);
  
  

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

export default BooksPage;

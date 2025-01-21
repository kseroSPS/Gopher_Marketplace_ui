import { useState } from 'react';

import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(0);
  const [course, setCourse] = useState('');
  const [professor, setProfessor] = useState('');

  const handleShowForm = () => setShowForm((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      itemName: name,
      img: image ? URL.createObjectURL(image) : null,
      description,
      course,
      professor,
      category,
      user,
      itemPrice:price,
      
    };

    // Pass the new product to the parent component (Home page)
    

    const token = '8bd1bd7bb60785f12f1cadb8681d37a09d8bc713'; 
    // Send the new product to the API using Axios
    axios.post('http://localhost:8000/api/products/',{
      name: newProduct.itemName,
      img: newProduct.img,
      description: newProduct.description,
      course: newProduct.course,
      professor: newProduct.professor,
      category: newProduct.category,
      user: newProduct.user,
      price:newProduct.itemPrice,
    },{
        headers: {
          'Authorization': `Token ${token}`,
        },
         
      }) // Send new product to local API
      .then((response) => {
        console.log('Product added:', response.data, category);
        navigate('/home', { state: { newProduct: response.data } });
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });

    // Reset form fields after submission
    setName('');
    setPrice('');
    setCategory('');
    setDescription('');
    setUser('');
    setCourse('');
    setProfessor('');
    // setImage(null);
  };
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <button
        onClick={handleShowForm}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        {showForm ? 'Close Form' : 'Add Product'}
      </button>
      {showForm && (
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',  
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            {/* Name */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* Price */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                type="number"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* Category */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Select a category</option>
                <option value='SCHOOL_SUPPLIES'>SCHOOL SUPPLIES</option>
                <option value='SPORTS'>SPORTS</option>
                <option value='ELECTRONICS'>ELECTRONICS</option>
                <option value='FURNITURE'>FURNITURE</option>
                <option value='CLOTHING'>CLOTHING</option>
                <option value='BOOKS'>BOOKS</option>
                <option value='OTHER'>OTHER</option>
              </select>
            </div>
            {/* Description */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* User */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>User</label>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="User"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* Course */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Course</label>
              <input
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Course"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* Professor */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Professor</label>
              <input
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                placeholder="Professor"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            {/* Image */}
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Prop validation


export default AddProduct;
